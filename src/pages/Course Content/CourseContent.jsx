import { useEffect, useState } from "react";
import Nav from "../../component/Navbar/Nav";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CourseContent.css";
import { FaFileAudio, FaFileVideo, FaFileAlt, FaTimes } from "react-icons/fa";
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
  const { setMaterial, material } = useMaterialStore((state) => state);

  const courseQuery = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(courseId),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [module, setModule] = useState(null);
  const [firstMaterialId, setFirstMaterialId] = useState(null);

  const handleClick = () => {
    setFirstMaterialId(material._id);
    setIsOpen((prev) => !prev);
  };

  const handleMenuLinkClick = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

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

  const courseResult = courseQuery?.data?.data?.resource;

  return (
    <div>
      <Nav />

      <div className="sidenav">
        <div className="sidenav-container">
          <div
            className="cursor-pointer mr-[30px] mb-[20px] text-[24px]"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          {isOpen && (
            <div className="side-nav-bar">
              <div className="sidenav-body">
                <div className="sidenav-title">
                  <h2 className="mr-3 text-sm lg:text-lg">
                    {courseResult?.title}
                  </h2>
                  <div
                    className="cursor-pointer  text-[20px]"
                    onClick={handleClick}
                  >
                    <FaTimes />
                  </div>
                </div>
                <div className="Sidenav-tab">
                  <div className="Menutabs">
                    {courseResult?.modules?.map((module, index) => (
                      <CourseMaterial
                        key={module?._id + index}
                        index={index}
                        setActiveTab={setActiveTab}
                        module={module}
                        activeTab={activeTab}
                        handleMenuLinkClick={handleMenuLinkClick}
                        setModule={setModule}
                        activeSubmenu={activeSubmenu}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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

const CourseMaterial = ({
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

const ModuleMaterials = ({ moduleId }) => {
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

const ModuleMaterialSymbolAndTitle = ({ material }) => {
  const setMaterial = useMaterialStore((state) => state.setMaterial);
  return (
    <div
      className="text-sm flex gap-2  hover:text-blue-1000"
      onClick={() => setMaterial(material)}
    >
      <div className="">
        {material.type === mediaType.VIDEO ? (
          <FaFileVideo />
        ) : material.type === mediaType.AUDIO ? (
          <FaFileAudio />
        ) : (
          <FaFileAlt />
        )}
      </div>
      <div className="text-[.8rem]">
        <h4>{material.title}</h4>
        <span>{material.type}</span>
      </div>
    </div>
  );
};
