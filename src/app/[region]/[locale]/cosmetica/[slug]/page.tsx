import {
  makeGenerateStaticParams,
  makeGenerateMetadata,
  makeProductPage,
  dynamicParams as _dynamicParams,
} from '@/lib/catalog/product-page-factory';

export const generateStaticParams = makeGenerateStaticParams('cosmetica');
export const generateMetadata = makeGenerateMetadata('cosmetica');
export const dynamicParams = _dynamicParams;

const Page = makeProductPage('cosmetica');
export default Page;
