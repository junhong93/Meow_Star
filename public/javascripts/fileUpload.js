const { FilePond } = require("filepond");
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageEncode
)

FilePond.parse(document.body);
