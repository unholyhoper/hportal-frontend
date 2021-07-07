import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [],
	entryComponents: [],
	imports: SharedModule.MODULE_LIST,
	exports: SharedModule.MODULE_LIST,
	providers: []
})
export class SharedModule {
	static readonly MODULE_LIST = [
		CommonModule,
	];
}
