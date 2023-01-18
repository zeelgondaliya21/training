1.Get/GetById

create or replace function patientget(
	f_patient_id integer default null,
	f_firstname varchar(50) default null,
	f_middlename varchar(50) default null,
	f_lastname varchar(50) default null,
	f_dob date default null,
	f_sex varchar(50) default null,
	size int default 10::integer,
	page int default 1::integer)
returns table (
	patient_id integer,
	firstame varchar,
	middlename varchar, 
	lastname varchar,
	dob date,
	chart_number text,
	sex varchar)
	language plpgsql
as
$$
declare
	declare queryStatement varchar;
	declare var integer:=1;
begin
		queryStatement:='select p.patient_id,p.firstname,p.middlename,p.lastname,p.dob,p.chart_number,g.sex
		from patient p
		inner join gender g 
		on p.gender_id = g.gender_id
		where 1=1';
		queryStatement:=queryStatement||
		case
			when
				$1 is not null
			then ' and p.patient_id  = $1' else '' end|| 
		case
			when
				$2 is not null 
			then 
				' and p.firstname=$2' else '' end||
		case
			when 
				$3 is not null
			then
				' and p.middlename=$3' else '' end||
		case	
			when
				$4 is not null
			then 
				' and p.lastname=$4' else '' end||
		case
			when 
				$5 is not null
			then 
				' and p.dob=$5' else '' end||
		case	
			when 
				$6 is not null 
			then
				' and g.sex=$6' else '' end;
		
		queryStatement:=queryStatement||' order by p.firstname asc, p.lastname asc, p.dob asc,g.sex asc ';
		queryStatement:=queryStatement||' limit '||size||' offset (('||page||'-1)*'||size||');';
		return query execute queryStatement using f_patient_id , f_firstname , f_middlename , f_lastname , f_dob , f_sex , size , page;
		RAISE NOTICE 'query%',queryStatement;
	end;
$$;
===========================================================================================================================================================================
2.Create

create or replace function patientcreate(fn varchar(50), mn varchar(50), ln varchar(50), db date, gen integer)
returns int
language plpgsql
as
$$
declare
	newpk integer;
begin 
	insert into patient(firstname, middlename, lastname, dob, gender_id) values(fn, mn, ln, db,gen)
	returning patient_id into newpk;
	return newpk;
end;
$$;
===========================================================================================================================================================================
3.Update

create or replace function patientupdate
(
f_patient_id integer,
f_firstname varchar(4000) default null, 
f_lastname varchar(4000) default null, 


f_sex varchar default null,
f_middlename varchar(4000) default null, 
f_dob date default null
)
returns table (
patient_id integer, 
firstname varchar(200), 
lastname varchar(200), 
middlename varchar(200), 
dob date,
genderid integer,
chart_number text, 
deleted boolean
) as 
$$ 
declare
updates varchar(4000) := '';
update_query varchar(4000) := '';
sexId integer:=null;
begin 
    
    sexId := case when $4 is not null then (select gender_id from gender where sex = $4) else null end;
    
    updates := 	case when $2 is not null then 'firstname = $2' else '' end ||
                    case when $3 is not null then ', lastname = $3' else '' end ||
                    case when sexId is not null then ', gender_id =' || sexId else '' end ||
                    case when $5 is not null then ', middlename = $5' else '' end ||
                    case when $6 is not null then ', dob = $6' else '' end;
    
    update_query := 'update patient set '||
    				case when updates != '' 
                    then updates || ' where patient_id = $1 and deleted = false returning *'
                    else ' where 1 != 1 returning *'
                    end;
               
    RAISE NOTICE '%',update_query;
    return query execute update_query using f_patient_id,f_firstname, f_lastname,f_sex, f_middlename, f_dob;
	
   end;
$$ language plpgsql;
===========================================================================================================================================================================
4.delete

create or replace function patientdelete
(
 f_patient_id in integer 
)
returns table (
patient_id integer, 
firstname varchar(200), 
lastname varchar(200), 
middlename varchar(200), 
dob date, 
gender_id integer, 
chart_number text, 
deleted boolean
) as 
$$ 
declare
delete_query varchar(4000);
begin 
    
    delete_query := 'update patient set deleted = true'  || 
                    case when f_patient_id is not null 
                    then ' where patient_id = $1 and deleted = false returning *' 
                    else ' where 1 != 1 returning *'
                    end;
               
    
    return query execute delete_query using f_patient_id;
   RAISE NOTICE 'query%',delete_query;
end;
$$ 
language plpgsql;