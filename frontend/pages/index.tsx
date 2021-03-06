import React, { Fragment } from "react";
import Head from "next/head";
import HomeLayout from "../components/Layouts/homeLayout";
import { Card, Container } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Quizz from "../public/Quizz.json";
import LoginAnimation from "../public/Blogging.json";
import Lottie from "react-lottie";
import { Book, Bug, Google } from "react-bootstrap-icons";
import { motion, useAnimation } from "framer-motion";
import { InView } from "react-intersection-observer";
import TD4_SETTINGS from "../app/config";

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const scaleToBigger = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      delay: 0.6,
      duration: 2,
    },
  },
};

const toTheRight = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const Home = () => {
  const animation = useAnimation();
  const animation1 = useAnimation();
  const handInView = (inView: boolean) => {
    if (inView) {
      animation.start("visible");
    }
  };
  const handInView1 = (inView: boolean) => {
    if (inView) {
      animation1.start("visible");
    }
  };
  // const dispatch = useAppDispatch();
  // const user_is_authenticated = useAppSelector(
  //   (state) => state.auth.is_authenticated
  // );
  // React.useEffect(() => {
  //   const local_token = localStorage.getItem("key");
  //   const token = local_token == null ? "" : local_token;
  //   dispatch(fetch_user(token))
  //     .unwrap()
  //     .then((res) => console.log("res", res))
  //     .catch((err) => console.log("err", err));
  // }, [dispatch]);

  // const handleLogout = () => {
  //   const token = localStorage.getItem("key");
  //   if (token !== null) {
  //     logout(token).then(() => {
  //       localStorage.removeItem("key");
  //       dispatch(set_not_authenticated());
  //     });
  //   }
  // };
  const bloggingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const quizzOptions = {
    loop: true,
    autoplay: true,
    animationData: Quizz,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <HomeLayout>
      <Fragment>
        <Head>
          <title>{TD4_SETTINGS.title}</title>
          <meta name="description" content="Web h???c l???p tr??nh online TD4" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
          ></link>
        </Head>
        <Container>
          <Container className={styles.section}>
            <div className={`row ${styles.container}`}>
              <div className={`col-12 col-md-6 ${styles.content}`}>
                <motion.h1
                  className={styles.title}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: "spring" }}
                >
                  N??i h???c nh???ng ??i???u m???i m???
                </motion.h1>
                <motion.p
                  className={styles.text}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  N??i h???c l???p tr??nh
                </motion.p>
                <motion.button
                  className={styles.button}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  <Link href="/search">
                    <a className={styles.link}>Kh??m Ph??</a>
                  </Link>
                </motion.button>
              </div>
              <motion.div
                className="col-12 col-md-6"
                variants={scaleToBigger}
                initial="hidden"
                animate="visible"
              >
                <Lottie options={bloggingOptions} height={400} width={400} />
              </motion.div>
            </div>
          </Container>
          <InView
            as="div"
            onChange={(inView) => {
              handInView(inView);
            }}
            threshold={0.4}
          >
            <Container className={styles.tutorial}>
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate={animation}
                transition={{ type: "spring" }}
              >
                C??c b?????c h???c code hi???u qu???
              </motion.h1>
              <motion.p
                variants={titleVariants}
                initial="hidden"
                animate={animation}
                transition={{ type: "spring", delay: 0.2 }}
              >
                Theo khuy???n kh??ch c???a nh??m ch??ng t??i
              </motion.p>
              <div className={`row justify-content-around`}>
                <motion.div
                  className="col d-flex justify-content-center"
                  variants={toTheRight}
                  initial="hidden"
                  animate={animation}
                  transition={{ type: "spring" }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text>
                        <Book
                          className={`${styles.card_icon} ${styles.book}`}
                        />
                      </Card.Text>
                      <Card.Title>H???c</Card.Title>
                      <Card.Text>
                        {"H???c ????? n???m v???ng nh???ng ki???n th???c c???n thi???t"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
                <motion.div
                  className="col d-flex justify-content-center"
                  variants={toTheRight}
                  initial="hidden"
                  animate={animation}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text>
                        <Google
                          className={`${styles.card_icon} ${styles.google}`}
                        />
                      </Card.Text>
                      <Card.Title>Google</Card.Title>
                      <Card.Text>
                        {
                          "T??? gi???i quy???t nh???ng v???n ????? b???ng c??ch google, bi???t c??ch google l?? k??? n??ng m???nh m???"
                        }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
                <motion.div
                  className="col d-flex justify-content-center"
                  variants={toTheRight}
                  initial="hidden"
                  animate={animation}
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text>
                        <Bug className={`${styles.card_icon} ${styles.bug}`} />
                      </Card.Text>
                      <Card.Title>S???a l???i</Card.Title>
                      <Card.Text>
                        {
                          "T??? gi???i quy???t, x??? l?? bugs, gi??p tr??? th??nh l???p tr??nh vi??n gi???i"
                        }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </div>
            </Container>
          </InView>
          <InView
            as="div"
            onChange={(inView) => {
              handInView1(inView);
            }}
            threshold={0.2}
          >
            <Container className={styles.section}>
              <div className={`row mt-5 ${styles.container}`}>
                <motion.div
                  className="col"
                  variants={scaleToBigger}
                  initial="hidden"
                  animate={animation1}
                >
                  <Lottie
                    options={quizzOptions}
                    height={400}
                    width={400}
                  ></Lottie>
                </motion.div>
                <div className={`col ${styles.content}`}>
                  <motion.h1
                    className={styles.title}
                    variants={titleVariants}
                    initial="hidden"
                    animate={animation1}
                    transition={{ type: "spring", delay: 0.4 }}
                  >
                    ??n l???i ki???n th???c c??ng nh???ng c??u h???i th?? v???
                  </motion.h1>
                  <motion.p
                    className={styles.text}
                    variants={titleVariants}
                    initial="hidden"
                    animate={animation1}
                    transition={{ type: "spring", delay: 0.6 }}
                  >
                    T??? ki???m tra ki???n th???c c???a m??nh ????? c???ng c??? k??? n??ng
                  </motion.p>
                  <motion.button
                    className={styles.button}
                    variants={titleVariants}
                    initial="hidden"
                    animate={animation1}
                    transition={{ type: "spring", delay: 0.8 }}
                  >
                    <Link href="/baitap">
                      <a className={styles.link}>??n T???p</a>
                    </Link>
                  </motion.button>
                </div>
              </div>
            </Container>
          </InView>
        </Container>
      </Fragment>
    </HomeLayout>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await axios.get('http://nginx/api/course/');
//   const data = response.data;
//   return {
//     props: { data },
//   };
// };

export default Home;
