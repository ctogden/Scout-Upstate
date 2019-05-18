table! {
    attraction (id) {
        id -> Int4,
        name -> Varchar,
        description -> Nullable<Text>,
        hours_text -> Nullable<Text>,
        url_slug -> Nullable<Varchar>,
        town_id -> Nullable<Int4>,
        address -> Nullable<Varchar>,
        coordinates -> Nullable<Geography>,
        website -> Nullable<Varchar>,
        phone -> Nullable<Varchar>,
        show_phone -> Nullable<Bool>,
        open_to_public -> Nullable<Bool>,
        internal_notes -> Nullable<Text>,
        listing_ready -> Nullable<Bool>,
    }
}

table! {
    attraction_tag (id) {
        id -> Int4,
        name -> Nullable<Varchar>,
        primary_tag -> Nullable<Bool>,
        show_tag -> Nullable<Bool>,
    }
}

table! {
    attraction_to_attraction_tag (id) {
        id -> Int4,
        attraction_id -> Nullable<Int4>,
        attraction_tag_id -> Nullable<Int4>,
    }
}

table! {
    county (id) {
        id -> Int4,
        name -> Nullable<Varchar>,
    }
}

table! {
    spatial_ref_sys (srid) {
        srid -> Int4,
        auth_name -> Nullable<Varchar>,
        auth_srid -> Nullable<Int4>,
        srtext -> Nullable<Varchar>,
        proj4text -> Nullable<Varchar>,
    }
}

table! {
    town (id) {
        id -> Int4,
        name -> Nullable<Varchar>,
        county_id -> Nullable<Int4>,
    }
}

joinable!(attraction -> town (town_id));
joinable!(attraction_to_attraction_tag -> attraction (attraction_id));
joinable!(attraction_to_attraction_tag -> attraction_tag (attraction_tag_id));
joinable!(town -> county (county_id));

allow_tables_to_appear_in_same_query!(
    attraction,
    attraction_tag,
    attraction_to_attraction_tag,
    county,
    spatial_ref_sys,
    town,
);
