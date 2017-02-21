<script>
function imgError(image, h, w) {
    image.onerror = "";
    image.src = "http://placekitten.com/" + h + "/" + w + "?image={{ range(1, 10) | random }}";
    return true;
}
</script>