import { React, useEffect, useState } from "react";
import Nav from "../../component/Navbar/Nav";
import Coursesidebar from "../../component/Courses/Coursesidebar";
import "./CourseContent.css";
import { FaFileAudio, FaFileVideo, FaFileAlt} from "react-icons/fa";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { OverlayLoader } from "../../loaders";
import { useParams } from "react-router-dom";
import { mediaType } from "../../utils";
import CourseModuelMaterial from "../../component/Courses/CourseModuleMaterial";
import { useMaterialStore } from "../../store/materialStore";

const CourseContent = () => {
  const { courseId } = useParams();
  const { getCourse, getCourseModulesMaterials } = queries;
  const setMaterial = useMaterialStore((state) => state.setMaterial);

  const courseQuery = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(courseId),
  });

  const [module, setModule] = useState(null);
  const [firstMaterialId, setFirstMaterialId] = useState(null);

  const moduleMaterialQuery = useQuery({
    queryKey: ["moduleMaterial"],
    queryFn: () => getCourseModulesMaterials(module?._id),
    enabled: !!module?._id && !!firstMaterialId,
  });

  useEffect(() => {
    if (courseQuery?.data?.data?.resource?.modules?.length > 0) {
      setModule(courseQuery?.data?.data?.resource?.modules[0]);
      if (courseQuery?.data?.data?.resource?.modules[0]) {
        const doesModuleHaveMaterial =
          courseQuery?.data?.data?.resource?.modules[0]?.materials?.length > 0;

        if (doesModuleHaveMaterial) {
          const firstMaterialId =
            courseQuery?.data?.data?.resource?.modules[0]?.materials[0];
          setFirstMaterialId(firstMaterialId);
        }
      }
    }
  }, [courseQuery?.data?.data?.resource?.modules]);

  if (courseQuery?.isLoading) {
    return <OverlayLoader showing={true} />;
  }

  if (courseQuery?.isError) {
    <OverlayLoader showing={false} />;
    return <>An error occurred</>;
  }

  // const courseResult = courseQuery?.data?.data?.resource;

  return (
    <div>
      <Nav />
      <Coursesidebar />
      <div className="sidenav-content">
        {moduleMaterialQuery?.isLoading ? (
          <div>
            <h4 className="text-md text-blue-400">Loading material...</h4>
          </div>
        ) : moduleMaterialQuery?.isError ? (
          <div>
            <h4 className="text-md text-blue-400">
              An error occured while loading the material
            </h4>
          </div>
        ) : (
          <>
            {setMaterial(
              moduleMaterialQuery?.data?.data?.resource?.materials[0]
            )}
            <MainCourseContent module={module} />
          </>
        )}
      </div>
    </div>
  );
};

export default CourseContent;

export const MainCourseContent = ({ module }) => {
  const material = useMaterialStore((state) => state.material);

  return (
    <div className="tab-content">
      {material ? (
        <>
          <CourseModuelMaterial
            material={material}
            title={module?.title ?? "UNTITLED"}
          />
        </>
      ) : (
        <div className="my-[2rem] text-xl">No materials found</div>
      )}
    </div>
  );
};

export const CourseMaterial = ({
  setActiveTab,
  module,
  activeTab,
  handleMenuLinkClick,
  setModule,
  activeSubmenu,
  index,
}) => {
  return (
    <>
      <ul
        className={activeTab === module?._id ? "active" : ""}
        onClick={() => {
          setActiveTab(module?._id);
          setModule(module);
        }}
      >
        <li>
          <div
            className="menulink"
            onClick={() => handleMenuLinkClick(module?._id)}
          >
            Course module {index + 1} - {module?.title}{" "}
          </div>
          {!!module?.materials?.length && activeSubmenu === module?._id && (
            <div className="submenu">
              <ModuleMaterials moduleId={module?._id} />
            </div>
          )}
        </li>
      </ul>
    </>
  );
};

export const ModuleMaterials = ({ moduleId }) => {
  const { getCourseModulesMaterials } = queries;
  const moduleMaterialQuery = useQuery({
    queryKey: ["moduleMaterial"],
    queryFn: () => getCourseModulesMaterials(moduleId),
  });

  if (moduleMaterialQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  if (moduleMaterialQuery?.isError) {
    return <>An error occurred while fetching material</>;
  }

  const materials = moduleMaterialQuery?.data?.data?.resource?.materials;

  return (
    <div>
      <div className="submenu-items">
        {materials.length > 0 &&
          materials.map((material, index) => (
            <ModuleMaterialSymbolAndTitle material={material} key={index} />
          ))}
      </div>
    </div>
  );
};

export const ModuleMaterialSymbolAndTitle = ({ material }) => {
  const setMaterial = useMaterialStore((state) => state.setMaterial);
  return (
    <div
      className="text-sm flex gap-2  hover:text-blue-1000"
      onClick={() => setMaterial(material)}
    >
      <div className="flex justify-center items-center">
        {material.type === mediaType.VIDEO ? (
          <FaFileVideo size="2em"/>
        ) : material.type === mediaType.AUDIO ? (
          <FaFileAudio size="2em"/>
        ) : (
          <FaFileAlt size="2em"/>
        )}
      </div>
      <div className="">
        <h3>{material.title}</h3>
        <span>{material.type}</span>
      </div>
    </div>
  );
};
