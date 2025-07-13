export function formatFileSize(size) {
	if (size >= 1024 * 1024) {
		return `${(size / (1024 * 1024)).toFixed(2)} MB`;
	}
	return `${(size / 1024).toFixed(1)} KB`;
}
