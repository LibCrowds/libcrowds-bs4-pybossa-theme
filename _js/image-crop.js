let imageCrop;

if ($('#uploadPreview').length) {
    var $uploadCrop;
    var $preview = $('#uploadPreview');

    $uploadCrop = $preview.croppie({
        viewport: {
            width: $preview.width() || 300,
            height: $preview.height() || 300,
            type: $preview.hasClass('crop-circle') ? 'circle' : 'square'
        },
        boundary: {
            width: $preview.width() || 300,
            height: $preview.height() || 300
        },
        update: function (data) {
            $("#x1").val(Math.floor(data.points[0]));
            $("#y1").val(Math.floor(data.points[1]));
            $("#x2").val(Math.floor(data.points[2]));
            $("#y2").val(Math.floor(data.points[3]));
        }
    });

    $('#avatar').on('change', function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                $uploadCrop.croppie('bind', {
                    url: evt.target.result
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
}

export default imageCrop;
