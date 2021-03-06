import React, { useEffect, useState } from "react";
import HomeLayout from "../../../../components/Layouts/homeLayout";
import Image from "next/image";
import ImageAddCourse from "../../../../public/addcourse.png";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import SelectField from "../../../../components/CustomFields/SelectField";
import CheckBoxField from "../../../../components/CustomFields/CheckBoxField";
import courseApi from "../../../api/courseApi";
import InputField from "../../../../components/CustomFields/InputField";
import styles from "../../../../styles/AddCourse.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import TD4_SETTINGS from "../../../../app/config";
import { ChevronDoubleRight } from "react-bootstrap-icons";

function AddCourse() {
  const router = useRouter();
  const inititalValues = {
    group: "",
    topics: [],
    icon: "",
    name: "",
  };

  const validationSchema = Yup.object().shape({
    group: Yup.string().required("This field is required"),
    topics: Yup.array().min(1, "Need as least one"),
    icon: Yup.string().required("This field is required"),
    name: Yup.string().required("This field is required"),
  });

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
  return (
    <>
      <Head>
        <title>Th??m kh??a h???c | {TD4_SETTINGS.title}</title>
      </Head>
      <HomeLayout>
        <div className="container">
          <div className="d-flex align-items-center">
            <Link href="/user">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.text}>B???ng ??i???u khi???n</h4>
              </a>
            </Link>
            <ChevronDoubleRight className={styles.text_icon} />
            <Link href="/user/mycourse">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.text}>C??c kh??a h???c c???a t??i</h4>
              </a>
            </Link>
            <ChevronDoubleRight className={styles.text_icon} />
            <Link href="/user/mycourse/addcourse">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.text}>Th??m kh??a h???c</h4>
              </a>
            </Link>
          </div>
          <div className="row align-items-center">
            <div className="col-6">
              <Image src={ImageAddCourse} width={600} height={600} />
            </div>
            <div className="col-6">
              <Formik
                initialValues={inititalValues}
                validationSchema={validationSchema}
                onSubmit={(value) => {
                  const config = {
                    headers: {
                      Authorization: `Token ${localStorage.getItem("key")}`,
                    },
                  };
                  courseApi.postCourse(value, config);
                  router.push("/user/mycourse");
                }}
              >
                {(formikProps) => {
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
                        className={`${styles.button_group} mt-4`}
                        type="submit"
                      >
                        Th??m kh??a h???c
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default AddCourse;
