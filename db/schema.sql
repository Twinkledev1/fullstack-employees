DROP TABLE IF EXISTS employees;


create table employees(
id serial primary key,
name text  not null,
birthday date not null,
salary integer not null
)