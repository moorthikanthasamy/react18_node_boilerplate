
import createStoreWithInitialState from '../store';
import ComponentFactory from '../factory/ComponentFactory';

const streamContent = async (req, res, params) => {

	let initialData = {
		page1Reducer: { device: params.deviceType }
	};
	let store = createStoreWithInitialState(initialData);
	const headerStr = ComponentFactory.getHTMLHead();
	res.write(headerStr);

	const componentStr = ComponentFactory.getContentComponent(store);
	res.write(componentStr);

	const footerStr = ComponentFactory.getBottomContent(store, params);
	res.end(footerStr);
};
export default streamContent;
