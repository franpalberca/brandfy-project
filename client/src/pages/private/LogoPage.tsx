import Footer from '../../components/footer/Footer';
import NavbarSite from '../../components/navbar/Navbar';
import GjsEditor from '@grapesjs/react';
import grapesjs, {Editor} from 'grapesjs';

const LogoPage = () => {
	const onEditor = (editor: Editor) => {
		console.log('Editor loaded', {editor});
	};

	return (
		<>
			<NavbarSite />
			<GjsEditor
				grapesjs={grapesjs}
				grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
				options={{
					height: '77vh',
					width: '100%',
					container: '#gjs',
					storageManager: {
						id: 'gjs-',
						type: 'local',
						autosave: true,
					},
					pluginsOpts: {
						'grapesjs-preset-webpage': {
							blocksBasicOpts: {
								blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
								flexGrid: 1,
							},
							blocks: ['link-block', 'quote', 'text-basic'],
						},
					}, 
                    panels:{defaults: []},

					projectData: {
						pages: [
							{
								name: 'Home page',
								component: `<h1>GrapesJS React Custom UI</h1>`,
							},
						],
					},
				}}
				onEditor={onEditor}
			/>
			<Footer />
		</>
	);
};

export default LogoPage;
