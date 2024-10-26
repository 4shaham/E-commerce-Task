import { Card, CardBody } from "@material-tailwind/react";

interface Props {
  url: string;
}

export const CategoryCard: React.FC<Props> = ({ url }) => {
  return (
    <Card className="rounded-3xl overflow-hidden group cursor-pointer">
      <CardBody className="p-0">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={url}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </CardBody>
    </Card>
  );
};
