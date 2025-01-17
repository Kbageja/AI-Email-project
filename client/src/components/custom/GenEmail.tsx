import { usegenEmail } from "@/services/emails/mutations";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../ui/carousel";

const EmailSlider: React.FC = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const data = {
    data: {
      emails: [
        {
          email: "user1@example.com",
          content: "Hello User1! This is your first email.",
        },
        {
          email: "user2@example.com",
          content: "Hello User2! This is your second email.",
        },
        {
          email: "user3@example.com",
          content: "Hello User3! This is your third email.",
        },
      ],
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 'md' breakpoint in Tailwind CSS
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

    // const { mutateAsync, data, isError, error } = usegenEmail();

  // useEffect(() => {
  //   const recipients = localStorage.getItem("selectedRecipients");
  //   if (recipients) {
  //     const parsedRecipients = JSON.parse(recipients);
  //     console.log("Triggering mutation with recipients:", parsedRecipients); // Debug
  //     mutateAsync({ recipients: parsedRecipients });
  //   }
  // }, [mutateAsync]);

  // useEffect(() => {
  //   if (isError) {
  //     console.error("Error fetching emails:", error);
  //   }
  // }, [isError, error]); 

  const handleContentChange = (index: number, newContent: string) => {
    if (data?.data?.emails) {
      data.data.emails[index].content = newContent; // Update content
    }
  };

  return (
    <div className="flex flex-col items-center my-12   min-h-screen bg-gray-50 px-4 mx-8 sm:px-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-green-600">Email Slider</h1>
      <p className="mt-4 text-gray-700 my-16 text-lg">Generated Emails</p>

      <Carousel setApi={setApi} opts={{
          align: "start",
        }} orientation={isMobile ? "horizontal" : "horizontal"} className={isMobile ? "w-full h-full max-w-xs my-[-18] mx-2 " : "mt-8 w-full max-w-4xl"}>
        <CarouselContent className={isMobile ? "-mt-1 " : ""}>
          {data?.data?.emails?.length === 0 ? (
            <div className="text-gray-500">No emails to display.</div>
          ) : (
            data?.data?.emails?.map((email: any, index: number) => (
              <CarouselItem key={index} className={isMobile ? "pt-1 md:basis-1/2" : ""}>
                <div className="flex flex-col items-center justify-center bg-white p-6 border rounded-lg shadow-lg">
                  <div className="w-full text-left text-lg font-semibold text-green-600">
                    <p>{email.email}</p>
                  </div>
                  <div className="mt-4 w-full text-center">
                    <textarea
                      value={email.content}
                      className="w-full h-30 md:h-60  p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => handleContentChange(index, e.target.value)}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className=""/>
        <CarouselNext className="" />
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
};

export default EmailSlider;
