<script>
	import { readPsd } from 'ag-psd';

	let container;

	async function change({
		target: {
			files: [files]
		}
	}) {
		const preview = window.URL.createObjectURL(files);

		const res = await fetch(preview);
		const buffer = await res.arrayBuffer();
		// read only document structure
		const psd = readPsd(buffer, {
			skipLayerImageData: true,
			skipCompositeImageData: true,
			skipThumbnail: true
		});
		console.log(psd);
	}
</script>

<!-- @ts-ignore -->
<input type="file" on:change={change} />
