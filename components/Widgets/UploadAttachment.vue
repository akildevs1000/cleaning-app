<template>
  <div>
    <input
      type="file"
      :ref="'fileInput'"
      style="display: none"
      multiple
      @change="handleFileInputChange"
    />

    <div  v-if="files.length">
      <div
        v-for="(file, index) in files"
        :key="file.key"
        style="display: inline-block; margin: 8px; position: relative"
      >
        <v-icon
          color="red"
          small
          style="position: absolute; top: -10px; right: -10px; cursor: pointer"
          @click="removeFile(index)"
        >
          mdi-close
        </v-icon>

        <component
          :label="`${name} ${file.size}`"
          icon="mdi-eye-outline"
          :is="currentComponent"
          :src="file.preview"
          style="max-width: 150px; max-height: 150px"
        />
      </div>
    </div>
     <v-btn
      @click="triggerFileInput"
      class="pa-6"
      block
      outlined
      rounded
      color="primary"
    >
      <v-icon large :color="color">mdi-camera-outline</v-icon>
      Photo</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: "Upload your attachment",
      type: String,
    },
    name: {
      default: "Photo",
      type: String,
    },
    color: {
      default: "primary",
      type: String,
    },
    validationMessage: {
      default: "Item not found",
      type: String,
    },
    rule: {
      default: true,
    },
  },
  data() {
    return {
      showUploads:false,
      files: [], // Array of { file, preview, size, key }
      currentComponent: "WidgetsViewTempFile",
      keyCounter: 1,
    };
  },
  methods: {
    triggerFileInput() {
      if (!this.rule) {
        alert(this.validationMessage);
        return;
      }
      this.$refs.fileInput.click();
    },

    async handleFileInputChange(event) {
      const selectedFiles = Array.from(event.target.files);
      if (!selectedFiles.length) return;

      for (const file of selectedFiles) {
        await this.compressAndPreview(file);
      }

      // Clear input to allow selecting same files again if needed
      this.$refs.fileInput.value = "";
    },

    compressAndPreview(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
              (blob) => {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });

                const compressedReader = new FileReader();
                compressedReader.readAsDataURL(compressedFile);
                compressedReader.onload = (compressedEvent) => {
                  const compressedDataUrl = compressedEvent.target.result;

                  const fileSizeInKB = (compressedFile.size / 1024).toFixed(2);

                  this.files.push({
                    key: this.keyCounter++,
                    file: compressedFile,
                    preview: compressedDataUrl,
                    size: `(${fileSizeInKB} KB)`,
                  });

                  // Emit array of all previews
                  this.$emit(
                    "files-preview",
                    this.files.map((f) => f.preview)
                  );
                  this.$emit(
                    "files-selected",
                    this.files.map((f) => f.preview)
                  );

                  resolve();
                };
              },
              "image/jpeg",
              0.3
            );
          };
        };
      });
    },

    removeFile(index) {
      this.files.splice(index, 1);

      // Emit updated arrays
      this.$emit(
        "files-preview",
        this.files.map((f) => f.preview)
      );
      this.$emit(
        "files-selected",
        this.files.map((f) => f.preview)
      );
    },
  },
};
</script>
