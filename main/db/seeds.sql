INSERT INTO department ( name)
VALUES 
( "Sales"),
( "HR"),
( "Social Media Department");

INSERT INTO roles ( title, salary, department_id)
VALUES
( "Manager", 80000, 1),
( "Manager", 85000, 2),
( "IT Support", 75000, 3);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES
( "Kurt", "Vonnegut", 1, null),
( "Johnny", "Appleseed", 2, null),
( "Bruce", "Lee", 3, null);
           