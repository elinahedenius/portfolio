 $(function(){
   var socket = io.connect();

   //login as a student
   const $studentLogin = $('#studentLogin');
   var $studentPsw = $('#studentPassword');
   var $studentEmail = $('#studentEmail');
   $studentLogin.submit(function(e){
     socket.emit('student login', {email: $studentEmail.val(), password: $studentPsw.val()});
     $studentPsw.val('');
     $studentEmail.val('');
   });

   //login as a teacher
   const $studentLogin = $('#teacherLogin');
   var $studentPsw = $('#teacherPassword');
   var $studentEmail = $('#teacherEmail');
   $studentLogin.submit(function(e){
     socket.emit('teacher login', {email: $teacherEmail.val(), password: $teacherPsw.val()});
     $teacherPsw.val('');
     $teacherEmail.val('');
   });
 })
