$(document).on('click', '.edit-profile', function (event) {
    $('#editProfileUserId').val(loggedInUser.id);
    $('#pfName').val(loggedInUser.name);
    $('#pfEmail').val(loggedInUser.email);
    $('#EditProfileModal').appendTo('body').modal('show');
});

$(document).on('change', '#pfImage', function () {
    let ext = $(this).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        $(this).val('');
        $('#editProfileValidationErrorsBox').
            html(
                'The profile image must be a file of type: jpeg, jpg, png.').
            show();
    } else {
        displayPhoto(this, '#edit_preview_photo');
    }
});

window.displayPhoto = function (input, selector) {
    let displayPreview = true
    if (input.files && input.files[0]) {
        let reader = new FileReader()
        reader.onload = function (e) {
            let image = new Image()
            image.src = e.target.result
            image.onload = function () {
                $(selector).attr('src', e.target.result)
                displayPreview = true
            }
        }
        if (displayPreview) {
            reader.readAsDataURL(input.files[0])
            $(selector).show()
        }
    }
}

$(document).on('submit', '#editProfileForm', function (event) {
    event.preventDefault();
    let userId = $('#editProfileUserId').val();
    var loadingButton = jQuery(this).find('#btnPrEditSave');
    loadingButton.button('loading');
    $.ajax({
        url: usersUrl + '/' + userId,
        type: 'post',
        data: new FormData($(this)[0]),
        processData: false,
        contentType: false,
        success: function success(result) {
            if (result.success) {
                $('#EditProfileModal').modal('hide');
                setTimeout(function () {
                    location.reload();
                }, 1500);
            }
        },
        error: function error(result) {
            console.log(result);
        },
        complete: function complete() {
            loadingButton.button('reset');
        }
    });
});
