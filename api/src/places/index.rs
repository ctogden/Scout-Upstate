use http::{self, Request, Response, StatusCode};
use reqwest::{header, Client};
use std::env;
use url::Url;
use serde_json::{Value};
use std::collections::HashMap;

fn handler(request: Request<()>) -> http::Result<Response<String>> {
    dotenv::dotenv().ok();

    let mut offset = String::new();
    let mut results: Vec<Value> = Vec::new();
    let endpoint_url = String::from("https://api.airtable.com/v0/app28CA7UaxwXn7l4/Places");

    loop {
        offset = request_airtable_data(&endpoint_url, &offset, &mut results);
        if offset.is_empty() {
            break;
        }
    }

    let mut json_results = serde_json::to_string(&results).expect("Could not convert results Vec to JSON string");

    let url = Url::parse(&request.uri().to_string()).expect("Could not parse request URL");
    let pairs: HashMap<String, String> = url.query_pairs().into_owned().collect();
    if pairs.contains_key("slug") {
        let slug = pairs.get("slug").expect("Could not access slug property of query string.");

        let rows: Vec<Value> = serde_json::from_str(&json_results).expect("Could not convert JSON string to Vec<Value>");
        for row in &rows {
            if &row["fields"]["Slug"].to_string().trim_matches('"') == slug {
                json_results = row.to_string();
                break;
            }
        }
    }

    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/json")
        .header(header::CACHE_CONTROL, "s-maxage=20, stale-while-revalidate")
        .header(header::ACCESS_CONTROL_ALLOW_HEADERS, "*")
        .body(json_results)
        .expect("Failed to render response.");
    
    Ok(response)
}

fn request_airtable_data(endpoint_url: &String, offset: &String, results: &mut Vec<Value>) -> String {
    let api_key = env::var("AIRTABLE_API_KEY").expect("API key must be set for Airtable authentication");
    let request_url = format!("{}?offset={}", endpoint_url, offset);

    let client = Client::new();
    let mut res = client
        .get(request_url.as_str())
        .header(header::ACCEPT, "application/json")
        .header(header::CONTENT_TYPE, "application/json")
        .header(header::AUTHORIZATION, format!("Bearer {}", api_key))
        .send()
        .expect("Failed to send HTTP request");

    assert_eq!(res.status(), StatusCode::OK);

    // Extract JSON string from response
    let page_json = res.text().expect("Failed to get response JSON");

    // Parse the string of data into serde_json::Value.
    let v: Value = serde_json::from_str(&page_json).expect("Failed to deserialize JSON");
    let records = v["records"].as_array().expect("Could not access records from JSON");
    
    results.extend_from_slice(&records[..]);

    let new_offset = v["offset"].as_str();
    match new_offset {
        Some(s) => s.trim_matches('"').to_string(),
        None => String::new()
    }
}