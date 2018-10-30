"use strict";

$(function () {
    var
        STUDENTS = '.school-students',
        STUDENT_DIALOG = '#student-dialog',
        STUDENT_LABEL = '#add-student-label',
        STUDENT_CREATE = '#student-create',
        STUDENT_UPDATE = '#student-update',
        STUDENT_DELETE = '#student-delete',
        STUDENT_ID = '#student-id',
        STUDENT_FIRST_NAME = '#student-first-name',
        STUDENT_LAST_NAME = '#student-last-name',
        STUDENT_SEX = '#student-sex',
        STUDENT_AGE = '#student-age';

    var fieldsMap = {
        "_id" : STUDENT_ID,
        "firstName": STUDENT_FIRST_NAME,
        "lastName": STUDENT_LAST_NAME,
        "sex": STUDENT_SEX,
        "age": STUDENT_AGE
    };

    var $students = $(STUDENTS);
    var config = new Config();


    var studentTemplate =
        `<tr>
            <td>#firstName</td>
            <td>#lastName</td>
            <td>#sex</td>
            <td>#age</td>
            <td>
                <div class="for-authorized"> 
                    [
                    <button type="button"
                        class="btn btn-link btn-sm text-secondary student-edit p-0" 
                        data-id="#_id"  
                        data-action="update"  
                        data-toggle="modal" 
                        data-target="#student-dialog">Edit</button>
                        |
                    <button type="button m-0" 
                        class="btn btn-link btn-sm text-secondary student-delete p-0" 
                        data-id="#_id"  
                        data-action="delete"  
                        data-toggle="modal" 
                        data-target="#student-dialog">Delete</button>
                   ]
                </div>
            </td>
        </tr>`;

    init();

    function error(err) {
        console.log(err);
    }

    function init() {
        loadStudents();
        initStudentPopup();
    }

    function sendAjaxRequest(urlPart, type, data){
        $.ajax({
            type: type,
            url: `${config.serverUrl}/api/students${urlPart}`,
            contentType: 'application/json',
            data: JSON.stringify(data || {}),
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", Cookies.get('Token'));
            },
            success: function () {                
                $(STUDENT_DIALOG).modal('hide');
                loadStudents();
            },
            error: error
        });
    }

    function getFormData(deleteId){
        var result = {};
        for(var key in fieldsMap) {
            var selector = fieldsMap[key];
            var value = $(selector).val();
            if (key === '_id' && !value){
                continue;
            }
            result[key] = value;
        };
        return result;
    }

    function initStudentPopup() {
        $(STUDENT_CREATE).click(function () {
            sendAjaxRequest('/create', 'POST', getFormData());            
        });

        $(STUDENT_UPDATE).click(function () {
            sendAjaxRequest(`/update/${$(STUDENT_ID).val()}`, 'PUT', getFormData());            
        });

        $(STUDENT_DELETE).click(function () {
            sendAjaxRequest(`/delete/${$(STUDENT_ID).val()}`, "DELETE");            
        });

        $(STUDENT_DIALOG).on('show.bs.modal', function (event) {
            var $button = $(event.relatedTarget),
                action = $button.data('action'),
                id = $button.data('id'),
                $modal = $(this);
            if (action) {
                $.ajax({
                    type: "GET",
                    url: config.serverUrl + "/api/students/" + id,
                    success: function (student) {
                        if (action === 'update') {
                            initUpdate($modal, student);
                        } else if (action === 'delete') {
                            initDelete($modal, student);
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
        $modal.find(STUDENT_CREATE).toggle(values.action === 'create');        
        $modal.find(STUDENT_UPDATE).toggle(values.action === 'update');        
        $modal.find(STUDENT_DELETE).toggle(values.action === 'delete');        
        $modal.find(STUDENT_LABEL).text(values.label);        
        for(var key in fieldsMap) {
            $modal.find(fieldsMap[key]).val(values.item[key]).prop('readonly', values.action === 'delete' || key === '_id')
        };
    }

    function initCreate($modal) {
        initDialog($modal, {
            label: 'Add new student',
            button: 'Add',
            action: 'create',
            item: {}
        });
    }

    function initUpdate($modal, student) {
        initDialog($modal, {
            label: 'Update student',
            button: 'Save',
            action: 'update',
            item: student
        });
    }

    function initDelete($modal, student) {
        initDialog($modal, {
            label: 'Delete student',
            button: 'Delete',
            action: 'delete',
            item: student
        });
    }

    function loadStudents() {
        $.ajax({
            type: "GET",
            url: config.serverUrl + "/api/students/all",
            success: function (data) {
                if (data && data.length !== undefined) {
                    var studentsHtml = data.map(student => {
                        var result = studentTemplate;
                        for(var key in fieldsMap) {
                            var pattern = new RegExp(`#${key}`, 'g');
                            result = result.replace(pattern, student[key] || '');
                        }
                        return result;        
                    }).join();
                    $students.html(studentsHtml);
                    document.schoolUser.toggleAuthElements();

                } else {
                    error(data);
                }
            },
            error: error
        });
    }

    
});