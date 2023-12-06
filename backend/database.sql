create TABLE thread(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    post_count INTEGER,
    visible BOOLEAN,
    bumplimit BOOLEAN
);

create TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content VARCHAR(255),
    sage BOOLEAN,
    created_at TIMESTAMP,
    thread_id INTEGER,
    FOREIGN KEY (thread_id) REFERENCES thread (id)
);