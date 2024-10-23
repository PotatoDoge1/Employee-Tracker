INSERT INTO department (name)
VALUES ('department one'),
       ('department two'),
       ('department three'),
       ('department four'),
       ('department five');

INSERT INTO role (title, salary, department_id)
VALUES ('role one', 100000, 1),
       ('role two', 200000, 2),
       ('role three', 300000, 3),
       ('role four', 400000, 4),
       ('role five', 500000, 5),
       ('role six', 600000, 1),
       ('role seven', 700000, 2),
       ('role eight', 800000, 3),
       ('role nine', 900000, 4),
       ('role ten', 1000000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('First1', 'Last1', 1, 1),
       ('First2', 'Last2', 2, 1),
       ('First3', 'Last3', 2, 2),
       ('First4', 'Last4', 3, 2),
       ('First5', 'Last5', 3, 4),
       ('First6', 'Last6', 3, 4),
       ('First7', 'Last7', 4, 4),
       ('First8', 'Last8', 5, 6),
       ('First9', 'Last9', 5, 6),
       ('First10', 'Last10', 5, 6);