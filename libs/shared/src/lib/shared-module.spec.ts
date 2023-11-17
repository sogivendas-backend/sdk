import { sharedModule } from './shared-module';

describe('sharedModule', () => {
	it('should work', () => {
		expect(sharedModule()).toEqual('shared-module');
	});
});
