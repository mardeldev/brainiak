import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Cresta R",
    avatar: "C",
    title: "Business Owner",
    description:
      "This app has helped my productivity and idea generation. It's become invaluable to my business.",
  },
  {
    name: "Al J",
    avatar: "A",
    title: "Engineer",
    description:
      "I like that I have all forms of AI generation and the assistant all in one place.",
  },
  {
    name: "Lydia I",
    avatar: "L",
    title: "Data Scientist",
    description:
      "Managing my subscritption is super easy. I also enjoyed the initial free generations.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20 pt-36">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 ">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white text-left"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 pt-1">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-3 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
