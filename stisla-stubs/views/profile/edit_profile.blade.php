<div id="EditProfileModal" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Profile</h5>
                <button type="button" aria-label="Close" class="close outline-none" data-dismiss="modal">×</button>
            </div>
            {{ Form::open(['id'=>'editProfileForm','files'=>true]) }}
            <div class="modal-body">
                <div class="alert alert-danger d-none" id="editProfileValidationErrorsBox"></div>
                {{ Form::hidden('user_id',null,['id'=>'pfUserId']) }}
                {{ Form::hidden('is_active',1) }}
                {{csrf_field()}}
                <div class="row">
                    <div class="form-group col-sm-6">
                        {{ Form::label('name', 'Name :') }}<span class="required">*</span>
                        {{ Form::text('name', null, ['id'=>'pfName','class' => 'form-control','required', 'autofocus', 'tabindex' => "1"]) }}
                    </div>
                    <div class="form-group col-sm-6 d-flex">
                        <div class="col-sm-4 col-md-6 pl-0 form-group">
                            {{ Form::label('photo', 'Profile Image :') }}
                            <br>
                            <label
                                    class="image__file-upload btn btn-primary text-white"
                                    tabindex="2"> Choose
                                {{ Form::file('photo',['id'=>'pfImage','class' => 'd-none']) }}
                            </label>
                        </div>
                        <div class="col-sm-3 preview-image-video-container float-right mt-1">
                            <img id='edit_preview_photo' class="img-thumbnail user-img user-profile-img profilePicture"
                                 src="{{asset('img/logo.png')}}"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        {{ Form::label('email','Email :') }}<span class="required">*</span>
                        {{ Form::text('email', null, ['id'=>'pfEmail','class' => 'form-control','required', 'tabindex' => "3"]) }}
                    </div>
                </div>
                <div class="text-right">
                    {{ Form::button('save', ['type'=>'submit','class' => 'btn btn-primary','id'=>'btnPrEditSave','data-loading-text'=>"<span class='spinner-border spinner-border-sm'></span> Processing...", 'tabindex' => "5"]) }}
                    <button type="button" class="btn btn-light ml-1 edit-cancel-margin margin-left-5"
                            data-dismiss="modal">Cancel
                    </button>
                </div>
            </div>
            {{ Form::close() }}
        </div>
    </div>
</div>

