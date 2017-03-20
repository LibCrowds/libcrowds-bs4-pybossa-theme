if ($('#uploadPreview').length) {
    let $uploadCrop;
    let $preview = $('#uploadPreview');

    function readFile(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (evt) {
                $uploadCrop.croppie('bind', {
                    url: evt.target.result
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

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

    $('#avatar').on('change', function () { readFile(this); });
}