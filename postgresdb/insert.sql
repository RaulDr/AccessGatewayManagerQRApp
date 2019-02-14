INSERT INTO public.users(enabled,password,username,is_admin) VALUES(true,'$2a$04$qc5Ac12RpORlPExHrsZ7/erb8JCNMj14ZzVwj9QhWSEy0yHsegpO.','U3214',true);
INSERT INTO public.users(enabled,password,username,is_admin) VALUES(true,'$2a$10$fVhy0kyq4yBAT0Jjjdavc.4z2Fq.rVuGLM2lrc9hWlqe9LIbVEpFe','U4321',false);
INSERT INTO public.users(enabled,password,username,is_admin) VALUES(true,'$2a$10$gA15AS4mW7ugtkAN8URSGulfoDUatgQmUdUabpoe3O4QGrHRcsYE.','U4333',false);
INSERT INTO public.users(enabled,password,username,is_admin) VALUES(true,'$2a$10$VQ0fLCwagxwz7v.G3lMSG.2TR/qWLuL7lpj1rJZJDjiskHngZqne.','U4367',false);


INSERT INTO public.gate(id, name) VALUES (1, 'main entrance');
INSERT INTO public.gate(id, name) VALUES (2, 'dev office');
INSERT INTO public.gate(id, name) VALUES (3, 'qa office');
INSERT INTO public.gate(id, name) VALUES (4, 'hr department');
INSERT INTO public.gate(id, name) VALUES (5, 'elevator');


INSERT INTO public.user_gate(user_id, gate_id) VALUES (1, 1);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (1, 2);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (1, 3);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (1, 5);

INSERT INTO public.user_gate(user_id, gate_id) VALUES (2, 1);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (2, 2);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (2, 3);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (2, 4);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (2, 5);

INSERT INTO public.user_gate(user_id, gate_id) VALUES (3, 1);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (3, 2);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (3, 3);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (3, 4);
INSERT INTO public.user_gate(user_id, gate_id) VALUES (3, 5);

INSERT INTO public.user_gate(user_id, gate_id) VALUES (4, 1);


INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-05 09:30:44.476', '2019-02-05 17:43:48.677');
INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-03 09:42:44.476', '2019-02-03 15:43:48.677');
INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-08 10:00:44.476', '2019-02-08 18:43:48.677');
INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-13 09:42:44.476', '2019-02-13 20:14:48.677');
INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-01 07:42:44.476', '2019-02-01 13:43:48.677');
INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-10 14:42:44.476', '2019-02-10 20:43:48.677');
INSERT INTO public.access_log(id_user, in_timestamp, out_timestamp) VALUES ( 1, '2019-02-12 14:42:44.476', '2019-02-12 20:43:48.677');