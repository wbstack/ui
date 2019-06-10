-- TODO inject this password into the container with envsubst?
CREATE USER 'apiuser'@'%' IDENTIFIED BY 'apiuser-pass';

-- Create the DB. TODO envsubst for db name?
CREATE DATABASE apidb;

-- Needed in order to create new DBs and users and perform updates TODO envsubst?
-- TODO limit the host connectivity to an ip range? :D
GRANT ALL ON *.* TO 'apiuser'@'%';

-- The below was needed by the MW DB but i dont think it is needed here..
-- Needed in order to GRANT new users access to their own dbs
GRANT GRANT OPTION ON *.* TO 'apiuser'@'%';
