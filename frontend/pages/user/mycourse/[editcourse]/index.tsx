import { FastField, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import HomeLayout from "../../../../components/Layouts/homeLayout";
import courseApi from "../../../api/courseApi";
import * as Yup from "yup";
import InputField from "../../../../components/CustomFields/InputField";
import SelectField from "../../../../components/CustomFields/SelectField";
import CheckBoxField from "../../../../components/CustomFields/CheckBoxField";
import Image from "next/image";
import EditCourseImage from "../../../../public/EditCourse.png";
import styles from "../../../../styles/EditCourse.module.css";
import {
  ChevronDoubleRight,
  Pencil,
  PlusSquare,
  Trash,
} from "react-bootstrap-icons";
import Link from "next/link";
import Head from "next/head";
import TD4_SETTINGS from "../../../../app/config";
import {
  OverlayTrigger,
  Toast,
  ToastContainer,
  Tooltip,
} from "react-bootstrap";

function EditCourse() {
  const routerParams = useRouter();
  const router = routerParams.query;
  const [courseId, setCourseId] = useState<any>();
  const [showEditable, setShowEditTable] = useState<any>(null);
  const [config, setConfig] = useState<any>();

  const [showUpdate, setShowUpdate] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const toggleShowUpdate = () => setShowUpdate(false);
  const toggleShowPublish = () => setShowPublish(false);

  // const [showButtonPublish, setShowButtonPublish] = useState(false)
  const [iniitalValues, setinitialValues] = useState<any>({
    group: "",
    topics: [],
    icon: "",
    name: "",
  });
  useEffect(() => {
    setConfig({
      headers: { Authorization: `Token ${localStorage.getItem("key")}` },
    });
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await courseApi.getMyCourseByID(router.editcourse, {
        headers: { Authorization: `Token ${localStorage.getItem("key")}` },
      });
      const resPublic = await courseApi.getPulish(router.editcourse, {
        headers: { Authorization: `Token ${localStorage.getItem("key")}` },
      });
      setCourseId(res.data);
      // setShowButtonPublish('message' in resPublic.data)
    };
    Object.keys(router).length !== 0 && fetch();
  }, [router]);
  useEffect(() => {
    courseId &&
      setinitialValues({
        group: courseId.group,
        topics: courseId.topics.map((e: any) => e.toString()),
        icon: courseId.icon,
        name: courseId.name,
      });
  }, [courseId]);
  const [courseGroup, setCourseGroup] = useState<Array<any>>([]);
  const [courseTopic, setCourseTopic] = useState<Array<any>>([]);
  const [icons, setIcons] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const res = await courseApi.getGroupCourse();
      setCourseGroup(
        res.data.map(({ name, id }) => {
          return {
            value: id,
            name: name,
          };
        })
      );
      const resTopic = await courseApi.getTopicCourse();
      const resIcon = await courseApi.getListIcon();
      setCourseTopic(
        resTopic.data.map(({ id, name }) => {
          return {
            name: name,
            value: id,
          };
        })
      );
      setIcons(
        resIcon.data.map(({ name, nontation }) => {
          return {
            name: name,
            value: nontation,
          };
        })
      );
    };
    fetchGroup();
  }, []);

  const validationSchema = Yup.object().shape({
    group: Yup.string().required("This field is required"),
    topics: Yup.array().min(1, "Need as least one"),
    icon: Yup.string().required("This field is required"),
    name: Yup.string().required("This field is required"),
  });

  const handleAddChapter = async () => {
    await courseApi.postChapter(
      { name: "default", course: courseId.id },
      courseId.slug,
      config
    );
    const res = await courseApi.getMyCourseByID(courseId.slug, config);
    setCourseId(res.data);
  };
  const handleAddLesson = async (slugCourse: any, slugChapter: any) => {
    await courseApi.postLesson(
      { name: "default", chapter: slugChapter },
      slugCourse,
      slugChapter,
      config
    );
    const res = await courseApi.getMyCourseByID(courseId.slug, config);
    setCourseId(res.data);
  };
  const handdleShowEdit = (id: any) => {
    setShowEditTable(id);
  };
  const handleUpdate = async (idCourse: any, idChapter: any, e: any) => {
    const value = {
      name: e.target.value,
      course: courseId.id,
    };
    await courseApi.updateChapter(value, idCourse, idChapter, config);
    const res = await courseApi.getMyCourseByID(courseId.slug, config);
    setCourseId(res.data);
    setShowEditTable(null);
  };
  const handleUpdateLesson = async (
    idCourse: any,
    idChapter: any,
    idLesson: any,
    e: any
  ) => {
    const value = {
      name: e.target.value,
      chapter: idChapter,
    };
    await courseApi.updateLesson(value, idCourse, idChapter, idLesson, config);
    const res = await courseApi.getMyCourseByID(courseId.slug, config);
    setCourseId(res.data);
    setShowEditTable(null);
  };
  const handleDelete = async (idCourse: any, idChapter: any) => {
    await courseApi.deleteChapter(idCourse, idChapter, config);
    const res = await courseApi.getMyCourseByID(courseId.slug, {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` },
    });
    setCourseId(res.data);
  };
  const handleDeleteLesson = async (
    idCourse: any,
    idChapter: any,
    idLesson: any
  ) => {
    await courseApi.deleteLesson(idCourse, idChapter, idLesson, config);
    const res = await courseApi.getMyCourseByID(courseId.slug, {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` },
    });
    setCourseId(res.data);
  };
  const publicCourse = async (values: any) => {
    await courseApi.publishCourse(courseId.slug, values, config);
    setShowPublish(true);
    // setShowButtonPublish(false)
  };
  return (
    <HomeLayout>
      <Fragment>
        <Head>
          <title>
            Ch???nh s???a {`${courseId?.name}`} | {TD4_SETTINGS.title}
          </title>
        </Head>
        <div className="container position-relative">
          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={showPublish}
              onClose={toggleShowPublish}
              bg="success"
              delay={2000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">???? c??ng b???</strong>
              </Toast.Header>
              <Toast.Body>Kh??a h???c c???a b???n ???? public.</Toast.Body>
            </Toast>
            <Toast
              show={showUpdate}
              onClose={toggleShowUpdate}
              bg="success"
              delay={2000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">???? l??u</strong>
              </Toast.Header>
              <Toast.Body>Kh??a h???c c???a b???n ???? c???p nh???t</Toast.Body>
            </Toast>
          </ToastContainer>
          <div className="d-flex align-items-center flex-wrap">
            <Link href="/user">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.textLink}>B???ng ??i???u khi???n</h4>
              </a>
            </Link>
            <ChevronDoubleRight className={styles.text_icon} />
            <Link href="/user/mycourse">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.textLink}>C??c kh??a h???c c???a t??i</h4>
              </a>
            </Link>
            <ChevronDoubleRight className={styles.text_icon} />
            <Link href={routerParams.asPath}>
              <a className="text-reset text-decoration-none">
                <h4 className={styles.textLink}>Ch???nh s???a kh??a h???c</h4>
              </a>
            </Link>
          </div>
          <div className="row align-items-center mb-5">
            <div className="col-6">
              <Image src={EditCourseImage} width={500} height={500} />
            </div>
            <div className="col-6">
              <Formik
                enableReinitialize={true}
                initialValues={iniitalValues}
                validationSchema={validationSchema}
                onSubmit={(value) => {
                  if (value !== iniitalValues) {
                    courseApi.updateCourse(value, router.editcourse, config);
                    setinitialValues(value);
                    setShowUpdate(true);
                  }
                }}
              >
                {(formikProps) => {
                  const { values } = formikProps;
                  return (
                    <Form>
                      {courseGroup.length !== 0 && (
                        <FastField
                          name="group"
                          component={SelectField}
                          label="Ch???n nh??m kh??a h???c"
                          options={courseGroup}
                          labelOptions="Ch???n m???t nh??m"
                        />
                      )}
                      {courseTopic.length !== 0 && (
                        <FastField
                          name="topics"
                          component={CheckBoxField}
                          label="Ch???n c??c ch??? ?????"
                          options={courseTopic}
                        />
                      )}
                      {icons.length !== 0 && (
                        <FastField
                          name="icon"
                          component={SelectField}
                          label="Ch???n icon cho kh??a h???c"
                          options={icons}
                          labelOptions="Ch???n m???t icon"
                        />
                      )}
                      <FastField
                        name="name"
                        component={InputField}
                        label="T??n kh??a h???c"
                        type="text"
                        placeholder="Nh???p kh??a h???c..."
                      />
                      <button
                        type="submit"
                        className={styles.button_addChapter}
                      >
                        L??u
                      </button>
                      <button
                        type="button"
                        className={`${styles.button_addChapter} ms-3`}
                        onClick={() => publicCourse(values)}
                      >
                        Publish
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          {courseId && (
            <h1 className={styles.text}>Ch????ng c???a kh??a h???c {courseId.name}</h1>
          )}
          {courseId && (
            <div className={styles.text}>
              {courseId.chapters.length !== 0 && (
                <div>
                  {courseId.chapters.map((chapter: any) => {
                    return (
                      <div key={chapter.id} className="d-block">
                        <div className={styles.chapter}>
                          {showEditable === chapter.id ? (
                            <input
                              type="text"
                              defaultValue={chapter.name}
                              onBlur={(e) =>
                                handleUpdate(courseId.slug, chapter.id, e)
                              }
                              autoFocus={true}
                              contentEditable
                              className={styles.chapter_input}
                            />
                          ) : (
                            <div className="d-flex align-self-center align-items-center">
                              <div>{chapter.name}</div>
                              <button
                                type="button"
                                onClick={() => handdleShowEdit(chapter.id)}
                                className={styles.chapter_button}
                              >
                                <Pencil />
                              </button>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(courseId.slug, chapter.id)
                            }
                            className={styles.chapter_button}
                          >
                            <Trash />
                          </button>
                        </div>
                        {chapter.lessons.map((lesson: any) => {
                          return (
                            <div key={lesson.id} className={styles.lesson}>
                              {showEditable === lesson.id ? (
                                <input
                                  type="text"
                                  defaultValue={lesson.name}
                                  onBlur={(e) =>
                                    handleUpdateLesson(
                                      courseId.slug,
                                      chapter.id,
                                      lesson.id,
                                      e
                                    )
                                  }
                                  autoFocus={true}
                                  contentEditable
                                  className={styles.chapter_input}
                                />
                              ) : (
                                <div className="d-flex align-self-center align-items-center">
                                  <div>{lesson.name}</div>
                                  <button
                                    type="button"
                                    onClick={() => handdleShowEdit(lesson.id)}
                                    className={styles.chapter_button}
                                  >
                                    <Pencil />
                                  </button>
                                </div>
                              )}
                              <div>
                                <Link
                                  href={`/user/mycourse/${courseId.slug}/addcontent?lessonid=${lesson.id}&chapterid=${chapter.id}`}
                                >
                                  <a className={styles.chapter_button}>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip>Th??m n???i dung b??i h???c</Tooltip>
                                      }
                                    >
                                      <PlusSquare className="text-dark" />
                                    </OverlayTrigger>
                                  </a>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteLesson(
                                      courseId.slug,
                                      chapter.id,
                                      lesson.id
                                    )
                                  }
                                  className={styles.chapter_button}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() =>
                            handleAddLesson(courseId.slug, chapter.id)
                          }
                          className={styles.button}
                        >
                          Th??m b??i h???c
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => handleAddChapter()}
            className={styles.button_addChapter}
          >
            Add chapter
          </button>
        </div>
      </Fragment>
    </HomeLayout>
  );
}

export default EditCourse;
