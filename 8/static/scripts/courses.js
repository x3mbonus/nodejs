"use strict";

$(function () {
    var
        COURSES = '.school-courses',
        COURSE_DIALOG = '#course-dialog',        
        COURSE_LABEL = '#add-course-label',
        COURSE_SUBMIT = '#course-submit',
        COURSE_ID = '#course-id',
        COURSE_NAME = '#course-name',
        COURSE_DETAILS = '#course-details',
        COURSE_IMAGE_URL = '#course-image-url';

    var $courses = $(COURSES);
    var config = new Config();


    var courseTemplate =
        `<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 text-center">
            <img src="#src" alt="">
            <h5>#title</h5>
            <h6>#smallTitle</h6>
            <button type="button" 
                class="btn btn-link btn-sm text-secondary course-edit" 
                data-id="#id"  
                data-action="#update"  
                data-toggle="modal" 
                data-target="#course-dialog">[Edit]</button>
            <button type="button" 
                class="btn btn-link btn-sm text-secondary course-edit" 
                data-id="#id"  
                data-action="#delete"  
                data-toggle="modal" 
                data-target="#course-dialog">[Delete]</button>
        </div>`;

    init();

    function error(err) {
        console.log(err);
    }

    function init() {
        loadCourses();
        initCourseAddPopup();
        initCourseEditPopup();
    }

    function initCourseAddPopup() {
        $(COURSE_SUBMIT).click(function () {
            var id = $(COURSE_ID).val(),
                name = $(COURSE_NAME).val(),
                details = $(COURSE_DETAILS).val(),
                imageUrl = $(COURSE_IMAGE_URL).val(),
                action = id ? `update/${id}` : "create",
                url = `${config.serverUrl}/api/courses/${action}`;

            $.ajax({
                type: "POST",
                url: url,
                contentType: 'application/json',
                data: JSON.stringify({
                    name: name,
                    details: details,
                    imageUrl: imageUrl,
                }),
                dataType: "json",
                success: function (data) {
                    if (data && data.Success) {
                        $(COURSE_DIALOG).modal('hide');
                        loadCourses();
                    } else {
                        error(data);
                    }
                },
                error: error
            });
        });

        $(COURSE_DIALOG).on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var action = button.data('action');
            var id = button.data('id');
            if (action){
                $.ajax({
                    type: "GET",
                    url: config.serverUrl + "/api/courses/" + id,
                    success: function(course){
                        modal.find(COURSE_LABEL).text('Edit course');
                        modal.find(COURSE_SUBMIT).text('Save');
                        modal.find(COURSE_ID).val(course.Result.id);
                        modal.find(COURSE_NAME).val(course.Result.name);
                        modal.find(COURSE_DETAILS).val(course.Result.details);
                        modal.find(COURSE_IMAGE_URL).val(course.Result.imageUrl);
                    },
                    error: error
                }); 
                if (action === 'update'){

                } else if (action === 'delete'){
    
                }
            } else {
                
            }                       
        });

    }
    function initDialog(values){
        modal.find(COURSE_LABEL).text(values.label);
        modal.find(COURSE_SUBMIT).text(values.button);
        modal.find(COURSE_ID).val(values.id);
        modal.find(COURSE_NAME).val(values.name);
        modal.find(COURSE_DETAILS).val(values.details);
        modal.find(COURSE_IMAGE_URL).val(values.imageUrl);
    }

    function initCreate(modal){
        initDialog({
            label:'Add new course',
            button:'Add',
            id: '',
            name:'',
            details:'',
            imageUrl:''
        });            
    }




    function loadCourses() {
        $.ajax({
            type: "GET",
            url: config.serverUrl + "/api/courses/all",
            success: getSuccess,
            error: error
        });
    }

    function getSuccess(data) {
        if (data && data.Success) {

            if (data.Result &&
                data.Result.length > 0) {

                var coursesHtml = '';
                for (var i = 0; i < data.Result.length; i++) {
                    var course = data.Result[i];
                    var html = courseTemplate
                        .replace('#id', course.id)
                        .replace('#src', course.imageUrl)
                        .replace('#title', course.name)
                        .replace('#smallTitle', course.details);

                    coursesHtml += html;

                }
                if (coursesHtml) {
                    $courses.html(coursesHtml);
                }
            }

        } else {
            error(data);
        }

    }

    function initCourseEditPopup() {
        
    }
});