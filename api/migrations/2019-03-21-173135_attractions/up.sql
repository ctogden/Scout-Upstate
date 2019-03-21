CREATE EXTENSION postgis;

CREATE TABLE county (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE
);

-- Note that our "towns" don't always match census designations, 
-- and sometimes include villages, etc.
CREATE TABLE town (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    county_id INTEGER REFERENCES county(id)
);

CREATE TABLE attraction_tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    primary_tag BOOLEAN DEFAULT FALSE,
    show_tag BOOLEAN DEFAULT TRUE
);

CREATE TABLE attraction (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    description TEXT,
    hours_text TEXT,
    url_slug VARCHAR,
    town_id INTEGER REFERENCES town(id),
    address VARCHAR,
    coordinates GEOGRAPHY,
    website VARCHAR,
    phone VARCHAR,
    show_phone BOOLEAN,
    open_to_public BOOLEAN,
    internal_notes TEXT,
    listing_ready BOOLEAN
);

CREATE TABLE attraction_to_attraction_tag (
    id SERIAL PRIMARY KEY,
    attraction_id INTEGER REFERENCES attraction(id),
    attraction_tag_id INTEGER REFERENCES attraction_tag(id)
);

CREATE VIEW attraction_view AS
SELECT attraction.name,
    description,
    hours_text,
    url_slug,
    town.name AS town_name,
    county.name AS county_name,
    address,
    coordinates,
    website,
    phone,
    show_phone,
    open_to_public
FROM attraction
LEFT JOIN town ON town.id = attraction.town_id
LEFT JOIN county ON county.id = town.county_id
WHERE listing_ready = TRUE;