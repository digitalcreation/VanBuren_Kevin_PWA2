/*  
	Project Spiral
	Author: Kevin Van Buren
*/

(function($){
/*----------------------------------- Tooltip -----------------------------------*/
	$('.masterTooltip').hover(function(){
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');
    }, function(){
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 5;
        var mousey = e.pageY + 5;
        $('.tooltip')
            .css({top: mousey, left: mousex})
    });
/*----------------------------------- Tabbed Accordion -----------------------------------*/
	$('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();
    $('#tabs-nav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();
        $('#tabs-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');
        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');
    /* --- Mouse Hover Effect for Tabbed Accordion Buttons --- */
    $('#tabs-nav li').hover(function(){
        $(this).stop(true, false).animate({ duration: '800', opacity: '.5'});
    }, function(){
        $(this).stop(true, false).animate({  opacity: '100' });
    });
/*----------------------------------- Modal -----------------------------------*/
    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();
    });
    $('.close').on('click', function(event){
       event.preventDefault();
        $('#overlay')
            .fadeOut()
            .find('#modal')
            .fadeOut();
    });
/*--------------------- Fading Status ---------------------*/
    $('.mystatus').mouseover(function(){
       $(this).fadeTo(100,.3);
    });
    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });
/*----------------------------------- Register -----------------------------------*/
	$('#register').on('click', function(e){
		e.preventDefault();
		var firstname = $('#first').val(),
			lastname = $('#last').val(),
			username = $('#user').val(),
			email = $('#email').val(),
			password = $('#password').val();
		console.log(firstname+' '+lastname+' '+username+' '+email+' '+password+' ');
		$.ajax({
			url:'xhr/register.php',
			type: 'post',
			dataType: 'json',
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},
	
			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign('admin.html');
				}
			}
		})
	});
/*----------------------------------- Display User -----------------------------------*/
	$.getJSON("xhr/check_login.php", function(data){
			console.log(data);
			$.each(data, function(key, val){
				console.log(val.first_name);
				$(".userid").html("Welcome: " + val.first_name);
				});
		});
/*====================================== Start Buttons ======================================*/
/*----------------------------------- Login -----------------------------------*/
	$('#signinButton').on('click', function(e){
		e.preventDefault();
		var user = $('#user').val();
		var pass = $('#pass').val();
		console.log("This notifies you if the password is working");
		$.ajax({
			url:'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username: user,
				password: pass
			},
			success:function(response){
				console.log("Test User");
				if(response.error){
					alert(response.error);
				}else{
					window.location.assign('admin.html');
				}
			}
		});
	});
/*----------------------------------- Logout -----------------------------------*/
	$('#logOut').click(function(e){
		e.preventDefault();
		$.get('xhr/logout.php', function (){
		   window.location.assign('index.html');
		});
	});
/*----------------------------------- Logout -----------------------------------*/
	$('#dashboard').on('click', function(e){
		e.preventDefault();
		window.location.assign('admin.html')
	});
	
	$('#projectsBtn').on('click', function(e){
		e.preventDefault();
		window.location.assign('projects.html')
	});
/*----------------------------------- New Project -----------------------------------*/
	$('#addButton').on('click', function(e) {
		e.preventDefault();
		var projeName = $('#projectName').val(),
		projeDescription = $('#projectDescription').val(),
		projeDueDate = $('#projectDueDate').val(),
		status = $('input[name = "status"]:checked').prop("id");
		$.ajax({
			url: "xhr/new_project.php",
			type: "post",
			dataType: "json",
			data: {
				projectName: projeName,
				projectDescription: projeDescription,
				dueDate: projeDueDate,
				status: status
				},
				success: function(response) {
					console.log("Shows if project creation is successful");
					if(response.error){
						alert(response.error);
						}else{
							window.location.assign("projects.html");
							};
					}
			});
		});
/*======================================= End Buttons =======================================*/
/*----------------------------------- Get Project -----------------------------------*/
	var projects = function(){
		$.ajax({
			url: 'xhr/get_projects.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log(response.error);
					}else{
						for(var i=0, j=response.projects.length; i < j; i++){
							var result = response.projects[i];
							$('.projects').append(
							'<div style="border:1px solid black">' +
							" <input class='projectid' type='hidden' value='" + result.id + "'>" +
							" Project Name: " + result.projectName + "<br>" +
							" Project Description: " + result.projectDescription + "<br>" +
							" Project Status: " + result.status + "<br>"
							+ '<button class="deletebtn">Delete</button>'
							+ '<button class="editbtn">Edit</button>'
							+ '</div> <br>'
							);
							};
							$('.deletebtn').on('click', function(e){
								e.preventDefault();
								var resultid = $(this).parent().find('.projectid').val();
								console.log('test delete');
								$.ajax({
									url: 'xhr/delete_project.php',
									data: {
										projectID: resultid
										},
										type: 'post',
										dataType: 'json',
										success: function(response){
											console.log('Testing for success');
											if(response.error) {
												alert(response.error);
												}else{
													window.location.assign("projects.html");
													};
											}
									});
								}); // End Delete
						}
				}
			});
		}
		projects();
})(jQuery); // end private scope