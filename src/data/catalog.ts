import { Category, SubCategory, Product } from './types';
import { wifiCameraCategory, wifiCameraSubcategories } from './categories/wi-fi-camera';
import { ipVrSolutionsCategory, ipVrSolutionsSubcategories } from './categories/ip-and-vr-solutions';
import { analogCamerasCategory, analogCamerasSubcategories } from './categories/analog-cameras';
import { transmissionCategory, transmissionSubcategories } from './categories/transmission';
import { accessoriesCategory, accessoriesSubcategories } from './categories/accessories';

import { pandaPSeriesProducts } from './categories/wi-fi-camera/products/panda-p-series';
import { pandaSSeriesProducts } from './categories/wi-fi-camera/products/panda-s-series';
import { pandaBSeriesProducts } from './categories/wi-fi-camera/products/panda-b-series';
import { ptCamerasProducts } from './categories/ip-and-vr-solutions/products/pt-cameras';
import { variFocalCamerasProducts } from './categories/ip-and-vr-solutions/products/vari-focal-cameras';
import { fixedLensCamerasProducts } from './categories/ip-and-vr-solutions/products/fixed-lens-cameras';
import { nvrSystemsProducts } from './categories/ip-and-vr-solutions/products/nvr-systems';
import { xvrSystemsProducts } from './categories/ip-and-vr-solutions/products/xvr-systems';
import { analogCamerasProducts } from './categories/analog-cameras/products/analog-cameras';
import { networkSwitchesProducts } from './categories/transmission/products/network-switches';
import { mountingBracketsProducts } from './categories/accessories/products/mounting-brackets';

export const categories: Category[] = [
  wifiCameraCategory,
  ipVrSolutionsCategory,
  analogCamerasCategory,
  transmissionCategory,
  accessoriesCategory
];

export const subcategories: SubCategory[] = [
  ...wifiCameraSubcategories,
  ...ipVrSolutionsSubcategories,
  ...analogCamerasSubcategories,
  ...transmissionSubcategories,
  ...accessoriesSubcategories
];

export const products: Product[] = [
  ...pandaPSeriesProducts,
  ...pandaSSeriesProducts,
  ...pandaBSeriesProducts,
  ...ptCamerasProducts,
  ...variFocalCamerasProducts,
  ...fixedLensCamerasProducts,
  ...nvrSystemsProducts,
  ...xvrSystemsProducts,
  ...analogCamerasProducts,
  ...networkSwitchesProducts,
  ...mountingBracketsProducts
];

export * from './types';
