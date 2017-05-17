import Croppie from 'croppie';

let imageCrop;

if (document.getElementById('uploadPreview')) {
    let preview = document.getElementById('uploadPreview');
    
    let croppie = new Croppie(preview, {
        viewport: {
            width: preview.width || 300,
            height: preview.height || 300,
            type: preview.classList.contains('crop-circle') ? 'circle' : 'square'
        },
        boundary: {
            width: preview.width || 300,
            height: preview.height || 300
        },
        update: function (data) {
            document.getElementById("x1").value = Math.floor(data.points[0]);
            document.getElementById("y1").value = Math.floor(data.points[1]);
            document.getElementById("x2").value = Math.floor(data.points[2]);
            document.getElementById("y2").value = Math.floor(data.points[3]);
        }
    });

    document.getElementById('avatar').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                croppie.bind({
                    url: evt.target.result
                });
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}

export default imageCrop;
