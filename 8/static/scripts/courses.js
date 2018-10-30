"use strict";

$(function () {
    var
        COURSES = '.school-courses',
        COURSE_DIALOG = '#course-dialog',
        COURSE_LABEL = '#add-course-label',
        COURSE_CREATE = '#course-create',
        COURSE_UPDATE = '#course-update',
        COURSE_DELETE = '#course-delete',
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
            <div class="text-secondary small for-authorized">
            [
                <button type="button"
                    class="btn btn-link btn-sm text-secondary course-edit p-0" 
                    data-id="#id"  
                    data-action="update"  
                    data-toggle="modal" 
                    data-target="#course-dialog">Edit</button>
                    |
                <button type="button m-0" 
                    class="btn btn-link btn-sm text-secondary course-delete p-0" 
                    data-id="#id"  
                    data-action="delete"  
                    data-toggle="modal" 
                    data-target="#course-dialog">Delete</button>
            ]
            </div>
        </div>`;

    init();

    function error(err) {
        console.log(err);
    }

    function init() {
        loadCourses();
        initCoursePopup();
    }

    function post(urlPart, type, data){
        $.ajax({
            type: type,
            url: `${config.serverUrl}/api/courses${urlPart}`,
            contentType: 'application/json',
            data: JSON.stringify(data || {}),
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", Cookies.get('Token'));
            },
            success: function () {                
                $(COURSE_DIALOG).modal('hide');
                loadCourses();
            },
            error: error,
        });
    }

    function initCoursePopup() {
        $(COURSE_CREATE).click(function () {
            post('/create', 'POST', {
                name: $(COURSE_NAME).val(),
                details:  $(COURSE_DETAILS).val(),
                imageUrl: $(COURSE_IMAGE_URL).val()
            });            
        });

        $(COURSE_UPDATE).click(function () {
            post(`/update/${$(COURSE_ID).val()}`, 'PUT', {
                name: $(COURSE_NAME).val(),
                details:  $(COURSE_DETAILS).val(),
                imageUrl: $(COURSE_IMAGE_URL).val()
            });            
        });

        $(COURSE_DELETE).click(function () {
            post(`/delete/${$(COURSE_ID).val()}`, "DELETE");            
        });

        $(COURSE_DIALOG).on('show.bs.modal', function (event) {
            var $button = $(event.relatedTarget),
                action = $button.data('action'),
                id = $button.data('id'),
                $modal = $(this);
            if (action) {
                $.ajax({
                    type: "GET",
                    url: config.serverUrl + "/api/courses/" + id,
                    success: function (course) {
                        if (action === 'update') {
                            initUpdate($modal, course);
                        } else if (action === 'delete') {
                            initDelete($modal, course);
                        }
                    },
                    error: error
                });
            } else {
                initCreate($modal);
            }
        });
    }

    function initDialog($modal, values) {        
        $modal.find(COURSE_CREATE).toggle(values.action === 'create');        
        $modal.find(COURSE_UPDATE).toggle(values.action === 'update');        
        $modal.find(COURSE_DELETE).toggle(values.action === 'delete');        
        $modal.find(COURSE_LABEL).text(values.label);        
        $modal.find(COURSE_ID).val(values._id);
        $modal.find(COURSE_NAME).val(values.name).prop('readonly', values.action === 'delete');
        $modal.find(COURSE_DETAILS).val(values.details).prop('readonly', values.action === 'delete');
        $modal.find(COURSE_IMAGE_URL).val(values.imageUrl).prop('readonly', values.action === 'delete');
    }

    function initCreate($modal) {
        initDialog($modal, {
            label: 'Add new course',
            button: 'Add',
            _id: '',
            name: '',
            details: '',
            imageUrl: '',
            action: 'create'
        });
    }

    function initUpdate($modal, course) {
        initDialog($modal, {
            label: 'Update course',
            button: 'Save',
            _id: course._id,
            name: course.name,
            details: course.details,
            imageUrl: course.imageUrl,
            action: 'update'
        });
    }

    function initDelete($modal, course) {
        initDialog($modal, {
            label: 'Delete course',
            button: 'Delete',
            _id: course._id,
            name: course.name,
            details: course.details,
            imageUrl: course.imageUrl,
            action: 'delete'
        }, true);
    }

    function loadCourses() {
        $.ajax({
            type: "GET",
            url: config.serverUrl + "/api/courses/all",
            success: function (data) {
                if (data && data.length !== undefined) {
                    var coursesHtml = data.map(course => {
                        return courseTemplate
                            .replace(/#id/g, course._id)
                            .replace(/#src/g, course.imageUrl)
                            .replace(/#title/g, course.name)
                            .replace(/#smallTitle/g, course.details);
        
                    });
                    $courses.html(coursesHtml);                              
                    document.schoolUser.toggleAuthElements();
                } else {
                    error(data);
                }
            },
            error: error
        });
    }

    
});