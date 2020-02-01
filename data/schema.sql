DROP TABLE IF EXISTS explorer, weather, eventful;

CREATE TABLE explorer (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255),
  formattedquery VARCHAR(255),
  lat NUMERIC(10, 7),
  long NUMERIC(10, 7)
);

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    forecast VARCHAR(255),
    time VARCHAR(255)
);

CREATE TABLE eventful (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255),
    date VARCHAR(255),
    summary VARCHAR(255)
);

                                                      