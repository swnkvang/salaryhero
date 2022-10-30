# salaryhero

## เริ่มต้นการใช้งาน
<ul>
  <li>npm install</li>
</ul>

## ข้อกำหนดเบื้องต้น
- ### Programming Language
    - NodeJs 12.22.7
- ### Database
    - postgres
        - database name  :  datasalaryhero
        - table
            - employee
            - company
            - admin
            - company_admin
            - tranfer_request_money
            
- ### Constructor Database
 - สร้าง database โดยใช้ชื่อ : datasalaryhero
        - สร้าง table โดยใช้คำสั่งด้านล่าง
        CREATE TABLE salaryhero.employee (
          company_id serial4 NOT NULL,
          first_name varchar(100) NULL,
          last_name varchar(100) NULL,
          status varchar(10) NULL,
          update_time timestamp NULL,
          update_by varchar NULL,
          salary numeric NULL,
          employee_id varchar NOT NULL,
          CONSTRAINT employee_pk PRIMARY KEY (company_id, employee_id)
        );
        
        CREATE TABLE salaryhero.company (
          company_id serial4 NOT NULL,
          company_name varchar(100) NULL,
          create_time timestamp NULL,
          update_time timestamp NULL,
          update_by varchar(10) NULL,
          status varchar(8) NULL,
          create_by varchar(10) NULL,
          CONSTRAINT company_pk PRIMARY KEY (company_id)
        );
      
        CREATE TABLE salaryhero."admin" (
          admin_id serial4 NOT NULL,
          first_name varchar(100) NULL,
          last_name varchar(100) NULL,
          status varchar(8) NULL,
          create_by varchar(10) NULL,
          update_by varchar(10) NULL,
          create_time timestamp NULL,
          update_time timestamp NULL,
          CONSTRAINT admin_pk PRIMARY KEY (admin_id)
        );
        
        CREATE TABLE salaryhero.company_admin (
          admin_id serial4 NOT NULL,
          company_id serial4 NOT NULL,
          create_time timestamp NULL,
          update_time timestamp NULL,
          status varchar(8) NULL,
          id serial4 NOT NULL,
          CONSTRAINT company_admin_pk PRIMARY KEY (company_id, admin_id)
        );
        
        CREATE TABLE salaryhero.tranfer_request_money (
          employee_id varchar NOT NULL DEFAULT nextval('salaryhero.tranfer_request_money_employee_id_seq'::regclass),
          "month" varchar(2) NULL,
          "year" varchar(4) NULL,
          status varchar(8) NULL,
          create_time timestamp NULL,
          create_by varchar NULL,
          request_money numeric NULL,
          id serial4 NOT NULL
        );
