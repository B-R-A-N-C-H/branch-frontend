import {Button, Card, CardBody, Spacer} from "@nextui-org/react";
import RoundedFilledArrowIcon from "@/app/(site)/components/icons/RoundedFilledArrowIcon";
import GraduationCapIcon from "@/app/(site)/components/icons/GraduationCapIcon";
import ChatBubbleIcon from "@/app/(site)/components/icons/ChatBubbleIcon";

export default function Home() {
    return (
        <main>
            {/*Hero*/}
            <section
                className="h-fit pt-32 pb-16 px-16 phone:px-4"
                style={{
                    backgroundImage: 'url("/assets/hero-bg.jpg")'
                }}
            >
                <Card
                    isBlurred={false}
                    className="bg-white/10 text-white rounded-full backdrop-blur-md tablet:rounded-3xl p-2 w-fit phone:w-full phone:text-sm tablet:w-1/2 tracking-wide"
                >
                    <CardBody>
                        Nurturing Education Through Seamless Registration and Dynamic Communication
                    </CardBody>
                </Card>
                <Spacer y={6}/>
                <h1 className="text-8xl tablet:text-7xl phone:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">BRANCH</h1>
                <h3 className="text-white text-2xl tablet:text-lg phone:text-medium font-semibold">The Basic Schools&apos; Registration
                    Administration and Communications Hub</h3>
                <Spacer y={6}/>
                <Button
                    className="font-semibold bg-white rounded-full hover:scale-105 w-fit"
                    size="lg"
                    endContent={<RoundedFilledArrowIcon/>}
                >
                    Explore BRANCH
                </Button>
                <Spacer y={24}/>
                <div className="flex tablet:flex-col gap-8">
                    <div
                        className="flex gap-4 text-white py-5 px-3 bg-white/10 backdrop-blur-md rounded-2xl max-w-sm">
                        <div
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full self-center flex justify-center items-center">
                            <GraduationCapIcon width={28}/>
                        </div>
                        <p className="self-center font-light grow-0 max-w-[75%] text-sm">Effortlessly register students
                            online,
                            reducing the need
                            for physical visits and enhancing administrative efficiency.</p>
                    </div>
                    <div
                        className="flex gap-4 text-white py-5 px-3 bg-white/10 backdrop-blur-md rounded-2xl max-w-sm">
                        <div
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full self-center flex justify-center items-center">
                            <ChatBubbleIcon width={28}/>
                        </div>
                        <p className="self-center font-light grow-0 max-w-[75%] text-sm">Facilitate seamless
                            communication
                            between teachers and parents through email, noticeboard postings, and blog updates, ensuring
                            timely and transparent information exchange.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
