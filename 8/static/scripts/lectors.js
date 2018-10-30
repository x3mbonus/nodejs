"use strict";

$(function () {
    var
        LECTORS = '.school-lectors',
        LECTOR_DIALOG = '#lector-dialog',
        LECTOR_LABEL = '#add-lector-label',
        LECTOR_CREATE = '#lector-create',
        LECTOR_UPDATE = '#lector-update',
        LECTOR_DELETE = '#lector-delete',
        LECTOR_ID = '#lector-id',
        LECTOR_FULL_NAME = '#lector-full-name',
        LECTOR_PHOTO_URL = '#lector-photo-url',
        LECTOR_SHORT_TEXT = '#lector-short-text',
        LECTOR_LONG_TEXT = '#lector-long-text';

    var $lectors = $(LECTORS);
    var config = new Config();

    var lectorTemplate =
        `<div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="card">
                <img class="card-img-top" src="#photoUrl" alt="Photo">
                <div class="card-body">
                    <h5 class="card-title">#fullName</h5>
                    <p class="card-text">#shortText</p>                    
                    <a href="#" class="btn btn-primary">See more</a>
                </div>
                <div class="mx-auto for-authorized">
                [
                    <button type="button"
                        class="btn btn-link btn-sm text-secondary lector-edit p-0" 
                        data-id="#id"  
                        data-action="update"  
                        data-toggle="modal" 
                        data-target="#lector-dialog">Edit</button>
                        |
                    <button type="button m-0" 
                        class="btn btn-link btn-sm text-secondary lector-delete p-0" 
                        data-id="#id"  
                        data-action="delete"  
                        data-toggle="modal" 
                        data-target="#lector-dialog">Delete</button>
                ]
                </div>
            </div>
        </div>`;

    init();

    function error(err) {
        console.log(err);
    }

    function init() {
        loadLectors();
        initLectorPopup();
    }

    function post(urlPart, type, data){
        $.ajax({
            type: type,
            url: `${config.serverUrl}/api/lectors${urlPart}`,
            contentType: 'application/json',
            data: JSON.stringify(data || {}),
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", Cookies.get('Token'));
            },
            success: function () {                
                $(LECTOR_DIALOG).modal('hide');
                loadLectors();
            },
            error: error
        });
    }

    function initLectorPopup() {
        $(LECTOR_CREATE).click(function () {
            post('/create', 'POST', {
                fullName: $(LECTOR_FULL_NAME).val(),
                photoUrl:  $(LECTOR_PHOTO_URL).val(),
                shortText: $(LECTOR_SHORT_TEXT).val(),
                longText: $(LECTOR_LONG_TEXT).val()
            });            
        });

        $(LECTOR_UPDATE).click(function () {
            post(`/update/${$(LECTOR_ID).val()}`, 'PUT', {
                fullName: $(LECTOR_FULL_NAME).val(),
                photoUrl:  $(LECTOR_PHOTO_URL).val(),
                shortText: $(LECTOR_SHORT_TEXT).val(),
                longText: $(LECTOR_LONG_TEXT).val()
            });            
        });

        $(LECTOR_DELETE).click(function () {
            post(`/delete/${$(LECTOR_ID).val()}`, "DELETE");            
        });

        $(LECTOR_DIALOG).on('show.bs.modal', function (event) {
            var $button = $(event.relatedTarget),
                action = $button.data('action'),
                id = $button.data('id'),
                $modal = $(this);
            if (action) {
                $.ajax({
                    type: "GET",
                    url: config.serverUrl + "/api/lectors/" + id,
                    success: function (lector) {
                        if (action === 'update') {
                            initUpdate($modal, lector);
                        } else if (action === 'delete') {
                            initDelete($modal, lector);
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
        $modal.find(LECTOR_CREATE).toggle(values.action === 'create');        
        $modal.find(LECTOR_UPDATE).toggle(values.action === 'update');        
        $modal.find(LECTOR_DELETE).toggle(values.action === 'delete');        
        $modal.find(LECTOR_LABEL).text(values.label);        
        $modal.find(LECTOR_ID).val(values._id);
        $modal.find(LECTOR_FULL_NAME).val(values.fullName).prop('readonly', values.action === 'delete');
        $modal.find(LECTOR_PHOTO_URL).val(values.photoUrl).prop('readonly', values.action === 'delete');
        $modal.find(LECTOR_SHORT_TEXT).val(values.shortText).prop('readonly', values.action === 'delete');
        $modal.find(LECTOR_LONG_TEXT).val(values.longText).prop('readonly', values.action === 'delete');
    }

    function initCreate($modal) {
        initDialog($modal, {
            label: 'Add new lector',
            button: 'Add',
            _id: '',
            fullName: '',
            photoUrl: '',
            shortText: '',
            longText: '',
            action: 'create'
        });
    }

    function initUpdate($modal, lector) {
        initDialog($modal, {
            label: 'Update lector',
            button: 'Save',
            _id: lector._id,            
            fullName: lector.fullName,
            photoUrl: lector.photoUrl,
            shortText: lector.shortText,
            longText: lector.longText,
            action: 'update'
        });
    }

    function initDelete($modal, lector) {
        initDialog($modal, {
            label: 'Delete lector',
            button: 'Delete',
            _id: lector._id,     
            fullName: lector.fullName,
            photoUrl: lector.photoUrl,
            shortText: lector.shortText,
            longText: lector.longText,
            action: 'delete'
        }, true);
    }

    function loadLectors() {
        $.ajax({
            type: "GET",
            url: config.serverUrl + "/api/lectors/all",
            success: function (data) {
                if (data && data.length !== undefined) {
                    var lectorsHtml = data.map(lector => {
                        return lectorTemplate
                            .replace(/#id/g, lector._id)
                            .replace(/#fullName/g, lector.fullName)
                            .replace(/#photoUrl/g, lector.photoUrl)
                            .replace(/#shortText/g, lector.shortText)
                            .replace(/#longText/g, lector.longText);
        
                    });
                    $lectors.html(lectorsHtml);
                    document.schoolUser.toggleAuthElements();

                } else {
                    error(data);
                }
            },
            error: error
        });
    }

    
});