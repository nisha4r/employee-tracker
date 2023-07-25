INSERT INTO departments (name)
VALUES ("Medical"),
       ("Finance"),
       ("Sales"),
       ("Civil"),
       ("Pathology")
       ("Forensic")
       ("Maths");

 INSERT INTO roles (title, salary, department_id)
VALUES ("Medical officer", 450000, 1),
("Surgeon", 550000, 1),
       ("Accountant",100000, 2),
       ("Auditor",120000, 2),
       ("Sales Person",50000,3),
       ("Marketing Executive",100000,3),
       ("Architect", 200000,4),
       ("Elevation Designer", 130000,4),
       ("Pathologist",300000,5)
       ("Tutor",50000,5)
       ("Forensic Examiner", 350000,6)
       ("Math Professor",100000,7);   
        ("Math tutor",7000,7);      


 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nishanti", "Govindasamy", 1, 2),
("Ram", "Kumar", 2, 4),
       ("Lahasya", "Jayak",3, 2),
       ("Paul", "Anderson", 2, 3),
       ("Sam", "G",3, 4),
       ("Angela", "Rae",3, 4),
       ("Lisa", "Kudro", 4, 5),
       ("Jennifer", "Anniston",4, 6),
       ("Chandler", "Bing",5, 7)
       ("Ross", "Geller",5, 2)
       ("Monica", "Geller",6, 1)
       ("Joe", "Tribbiany",7, null);   
        ("Martha", "Stewart",7, null);    