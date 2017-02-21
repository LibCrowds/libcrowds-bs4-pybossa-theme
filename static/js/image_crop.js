function loadPreview() {
    "undefined" != typeof document.getElementById("avatar").files[0] && ($("#loading").show(), previewImage())
}! function(e) {
    function o() {
        var e = new FileReader;
        e.readAsDataURL(document.getElementById("avatar").files[0]), e.onload = function(e) {
            document.getElementById("uploadPreview").src = e.target.result;
            var o, a, n, i = document.getElementById("uploadPreview");
            $("<img/>").attr("src", $(i).attr("src")).load(function() {
                o = this.width, a = this.height, n = o > a ? (a - 100) / 2 : (o - 100) / 2, jQuery(function(e) {
                    e("#uploadPreview").Jcrop({
                        onSelect: t,
                        onChange: t,
                        bgColor: "black",
                        bgOpacity: .4,
                        minSize: [100, 100],
                        setSelect: [o / 2 - n, a / 2 - n, o / 2 + n, a / 2 + n],
                        aspectRatio: 1,
                        boxWidth: 450
                    })
                })
            }), $("#modal").modal("show")
        }
    }

    function t(e) {
        $("#x1").val(Math.floor(e.x)), $("#y1").val(Math.floor(e.y)), $("#x2").val(Math.floor(e.x2)), $("#y2").val(Math.floor(e.y2))
    }
    e = e || {}, e.previewImage = o
}(window), $("#modal").on("hidden.bs.modal", function() {
    JcropAPI = $("#uploadPreview").data("Jcrop"), JcropAPI.destroy(), $(".upload-img-form").trigger("reset")
}), $("#modal").on("shown.bs.modal", function() {
    $("#loading").hide()
});