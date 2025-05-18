interface Props {
  children: React.ReactNode;
}

const Paragraph: React.FC<Props> = ({ children }) => {
  return (
    <main className="text-left md:w-2/4 w-4/5 m-auto mt-2 pt-5">
      {children}
    </main>
  );
};

export default async function AboutPage() {
  return (
    <>
      <Paragraph>
        I'm Thien, a passionate hacker, inventor and software engineer. I love
        reading, especially about architecure and reverse engineering.
      </Paragraph>
      <Paragraph>
        I've been professionally a software engineer since 2020, and I also do
        reverse engineering in my free time, as well as learn data structures
        and algorithms to improve my work.
      </Paragraph>
      <Paragraph>
        I also have huge respect for anyone who is doing game optimization in
        this AI era, where everyone leverages AI to generate frames instead of
        optimizing the game itself. I believe there is a beauty in optimization.
      </Paragraph>
      <Paragraph>
        Last but not least, I enjoy learning about fun technical challenges and
        collaborating with great teams.{" "}
        <a href="mailto:nguyenducthien9.work@gmail.com" className="bg-red-600">
          Reach out
        </a>{" "}
        if you want to find a way to work together!
      </Paragraph>
    </>
  );
}
