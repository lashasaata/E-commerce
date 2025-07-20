type Tproduct = {
  id: number;
  company: string;
  category: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
};

type Tdata = {
  products: Product[];
};
