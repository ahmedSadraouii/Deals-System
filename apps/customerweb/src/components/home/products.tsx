import { ProductItem } from '@/components/product/product-item';

export default function Products() {
  return (
    <>
      <section className="mt-10 w-full bg-neutral-100 px-5 py-16">
        <div className="container mx-auto">
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold">Alle Deals im Überblick</h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <ProductItem
                  key={index}
                  image="/slider-train.png"
                  price={190}
                  discountPrice={0}
                />
              ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm leading-6 text-white"
            >
              Mehr anzeigen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
