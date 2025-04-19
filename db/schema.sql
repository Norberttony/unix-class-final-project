
CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content TEXT
);

INSERT INTO Posts (title, content)
VALUES ('Example Title', 'Example Content');

INSERT INTO Posts (title, content)
VALUES ('Yet Another Post', 'This is the content of the post, which should be displayed below a title.');
