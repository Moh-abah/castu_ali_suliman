// src/app/admin/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
    aboutData,
    skillsData,
    projects,
    contactData
} from "../../data/content";

const ADMIN_PASSWORD = "12345";

type Section = "about" | "skills" | "projects" | "contact" | "seo" | null;

// دالة لتحميل البيانات من localStorage
const loadSavedData = () => {
    try {
        const savedData = localStorage.getItem("portfolioData");
        if (savedData) return JSON.parse(savedData);
    } catch (e) {
        console.error("Failed to load saved data", e);
    }
    return null;
};

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [section, setSection] = useState<Section>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [activeTab, setActiveTab] = useState<"technical" | "experience">("technical");
    const [isSaving, setIsSaving] = useState(false);

    // تحميل البيانات المحفوظة أو استخدام البيانات الافتراضية
    const savedData = loadSavedData();
    const [about, setAbout] = useState(savedData?.aboutData || { ...aboutData });
    const [skills, setSkills] = useState(savedData?.skillsData || { ...skillsData });
    const [projectList, setProjectList] = useState(savedData?.projects || [...projects]);
    const [contact, setContact] = useState(savedData?.contactData || { ...contactData });
    const [seo, setSeo] = useState(savedData?.seoData || {
        title: "مصمم جرافيك محترف",
        description: "موقع تعريفي",
        keywords: ["مصمم جرافيك", "تصميم شعار", "هوية بصرية", "تصميم سوشيال ميديا"]
    });

    // عرض الإشعارات
    const showNotificationMessage = (message: string) => {
        setNotificationText(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    // تسجيل الدخول
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setPasswordInput("");
            showNotificationMessage("تم تسجيل الدخول بنجاح!");
        } else {
            showNotificationMessage("كلمة السر غير صحيحة");
        }
    };

    // تحديث بيانات about
    const updateAboutField = (field: keyof typeof aboutData, value: any) => {
        setAbout(prev => ({ ...prev, [field]: value }));
    };

    // تحديث المهارات
    const updateSkill = (
        arrayName: "technicalSkills" | "experienceItems",
        index: number,
        field: string,
        value: any
    ) => {
        const updatedArray = [...skills[arrayName]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        setSkills(prev => ({ ...prev, [arrayName]: updatedArray }));
    };

    // إضافة مهارة فنية جديدة
    const addNewTechnicalSkill = () => {
        const newSkill = { name: "", level: 50, color: "#31A8FF" };
        setSkills(prev => ({
            ...prev,
            technicalSkills: [...prev.technicalSkills, newSkill]
        }));
        showNotificationMessage("تمت إضافة مهارة جديدة!");
    };

    // إضافة خبرة جديدة
    const addNewExperience = () => {
        const newExperience = { title: "", icon: "⭐", count: "0" };
        setSkills(prev => ({
            ...prev,
            experienceItems: [...prev.experienceItems, newExperience]
        }));
        showNotificationMessage("تمت إضافة خبرة جديدة!");
    };

    // تحديث المشاريع
    const updateProject = (index: number, field: string, value: any) => {
        const updated = [...projectList];
        updated[index] = { ...updated[index], [field]: value };
        setProjectList(updated);
    };

    // إضافة مشروع جديد
    const addNewProject = () => {
        const newProject = {
            id: projectList.length + 1,
            title: "مشروع جديد",
            image: "/images/project-default.jpg",
            category: "فئة جديدة",
            description: "وصف المشروع...",
            link: "#"
        };
        setProjectList(prev => [...prev, newProject]);
        showNotificationMessage("تمت إضافة مشروع جديد!");
    };

    // تحديث بيانات التواصل
    const updateContactItem = (
        index: number,
        field: "title" | "value",
        value: string
    ) => {
        const updated = [...contact.contactInfo];
        updated[index] = { ...updated[index], [field]: value };
        setContact(prev => ({ ...prev, contactInfo: updated }));
    };

    // تحديث بيانات SEO
    const updateSeoField = (field: keyof typeof seo, value: any) => {
        setSeo(prev => ({ ...prev, [field]: value }));
    };

    // حفظ جميع التغييرات في localStorage
    const saveChanges = () => {
        setIsSaving(true);

        const dataToSave = {
            aboutData: about,
            skillsData: skills,
            projects: projectList,
            contactData: contact,
            seoData: seo
        };

        try {
            localStorage.setItem("portfolioData", JSON.stringify(dataToSave));
            showNotificationMessage("تم حفظ التغييرات بنجاح في المتصفح!");

            // بعد الحفظ، نقوم بتحديث الموقع تلقائياً
            window.location.reload();
        } catch (e) {
            showNotificationMessage("حدث خطأ أثناء الحفظ!");
            console.error("Failed to save data", e);
        }

        setTimeout(() => setIsSaving(false), 1000);
    };

    // تنزيل ملف JSON للبيانات
    const downloadJSON = () => {
        const dataToExport = {
            aboutData: about,
            skillsData: skills,
            projects: projectList,
            contactData: contact,
            seoData: seo
        };
        const jsonStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "content-data.json";
        a.click();
        URL.revokeObjectURL(url);
        showNotificationMessage("تم تنزيل ملف البيانات بنجاح!");
    };

    // واجهة تسجيل الدخول
    if (!isLoggedIn) {
        return (
            <div style={styles.loginContainer}>
                <div style={styles.loginCard}>
                    <div style={styles.logo}>
                        <div style={styles.logoIcon}>🎨</div>
                        <h2 style={styles.logoText}>لوحة علي سليمان  </h2>
                    </div>

                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>كلمة السر</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                style={styles.input}
                                autoFocus
                            />
                        </div>

                        <button type="submit" style={styles.loginButton}>
                            دخول
                        </button>
                    </form>

                    <div style={styles.footer}>
                        <p style={styles.footerText}>لوحة التحكم الإدارية - للمصممين المحترفين</p>
                    </div>
                </div>

                {showNotification && (
                    <div style={styles.notification}>
                        {notificationText}
                    </div>
                )}
            </div>
        );
    }

    // واجهة لوحة التحكم الرئيسية
    return (
        <div style={styles.adminContainer}>
            {/* شريط التنقل العلوي */}
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.headerTitle}>لوحة تحكم المصمم</h1>
                    <p style={styles.headerSubtitle}>إدارة محتوى موقعك بسهولة</p>
                </div>

                <div style={styles.headerRight}>
                    <button
                        onClick={saveChanges}
                        style={isSaving ? styles.savingButton : styles.saveButton}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <span style={styles.spinner}></span>
                                جاري الحفظ...
                            </>
                        ) : (
                            <>
                                <span style={styles.saveIcon}>💾</span>
                                حفظ التغييرات
                            </>
                        )}
                    </button>
                    <button
                        onClick={downloadJSON}
                        style={styles.downloadButton}
                    >
                        <span style={styles.downloadIcon}>⬇️</span>
                        تنزيل البيانات
                    </button>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        style={styles.logoutButton}
                    >
                        <span style={styles.logoutIcon}>🚪</span>
                        تسجيل خروج
                    </button>
                </div>
            </header>

            {/* القائمة الجانبية */}
            <aside style={styles.sidebar}>
                <div style={styles.userInfo}>
                    <div style={styles.avatar}>
                        <span style={styles.avatarIcon}>👤</span>
                    </div>
                    <h3 style={styles.userName}>مدير النظام</h3>
                    <p style={styles.userRole}>مصمم جرافيك</p>
                </div>

                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li
                            style={section === null ? styles.activeNavItem : styles.navItem}
                            onClick={() => setSection(null)}
                        >
                            <span style={styles.navIcon}>📊</span>
                            لوحة التحكم الرئيسية
                        </li>
                        <li
                            style={section === "about" ? styles.activeNavItem : styles.navItem}
                            onClick={() => setSection("about")}
                        >
                            <span style={styles.navIcon}>👤</span>
                            من أنا
                        </li>
                        <li
                            style={section === "skills" ? styles.activeNavItem : styles.navItem}
                            onClick={() => setSection("skills")}
                        >
                            <span style={styles.navIcon}>🎯</span>
                            المهارات والخبرات
                        </li>
                        <li
                            style={section === "projects" ? styles.activeNavItem : styles.navItem}
                            onClick={() => setSection("projects")}
                        >
                            <span style={styles.navIcon}>📂</span>
                            المشاريع
                        </li>
                        <li
                            style={section === "contact" ? styles.activeNavItem : styles.navItem}
                            onClick={() => setSection("contact")}
                        >
                            <span style={styles.navIcon}>📞</span>
                            التواصل
                        </li>
                        <li
                            style={section === "seo" ? styles.activeNavItem : styles.navItem}
                            onClick={() => setSection("seo")}
                        >
                            <span style={styles.navIcon}>🔍</span>
                            إعدادات SEO
                        </li>
                    </ul>
                </nav>

                <div style={styles.sidebarFooter}>
                    <p style={styles.sidebarFooterText}>لوحة تحكم مصممة خصيصًا للمصممين</p>
                </div>
            </aside>

            {/* المحتوى الرئيسي */}
            <main style={styles.mainContent}>
                {!section && (
                    <div style={styles.dashboard}>
                        <h2 style={styles.dashboardTitle}>لوحة التحكم الرئيسية</h2>

                        <div style={styles.statusCard}>
                            <div style={styles.statusIcon}>💾</div>
                            <h3 style={styles.statusTitle}>حالة الحفظ</h3>
                            <p style={styles.statusText}>استخدم زر "حفظ التغييرات" لحفظ التعديلات في متصفحك. ولتطبيق التغييرات على الموقع الحي، استخدم زر "تنزيل البيانات" ثم استبدل ملف content.js بالملف الذي تم تنزيله.</p>
                            <div style={styles.statusActions}>
                                <button
                                    onClick={saveChanges}
                                    style={styles.saveButton}
                                    disabled={isSaving}
                                >
                                    {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                                </button>
                                <button
                                    onClick={downloadJSON}
                                    style={styles.downloadButton}
                                >
                                    تنزيل البيانات
                                </button>
                            </div>
                        </div>

                        <div style={styles.statsContainer}>
                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>📂</div>
                                <h3 style={styles.statValue}>{projectList.length}</h3>
                                <p style={styles.statLabel}>المشاريع</p>
                            </div>

                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>🎯</div>
                                <h3 style={styles.statValue}>{skills.technicalSkills.length}</h3>
                                <p style={styles.statLabel}>المهارات</p>
                            </div>

                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>🏆</div>
                                <h3 style={styles.statValue}>{skills.experienceItems.length}</h3>
                                <p style={styles.statLabel}>الخبرات</p>
                            </div>

                            <div style={styles.statCard}>
                                <div style={styles.statIcon}>📱</div>
                                <h3 style={styles.statValue}>{contact.socialLinks.length}</h3>
                                <p style={styles.statLabel}>وسائل التواصل</p>
                            </div>
                        </div>

                        <div style={styles.quickActions}>
                            <h3 style={styles.sectionTitle}>إجراءات سريعة</h3>

                            <div style={styles.actionButtons}>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => setSection("projects")}
                                >
                                    <span style={styles.actionIcon}>➕</span>
                                    إضافة مشروع جديد
                                </button>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => setSection("skills")}
                                >
                                    <span style={styles.actionIcon}>➕</span>
                                    إضافة مهارة جديدة
                                </button>
                                <button
                                    style={styles.actionButton}
                                    onClick={() => setSection("seo")}
                                >
                                    <span style={styles.actionIcon}>⚙️</span>
                                    تحديث إعدادات SEO
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* قسم "من أنا" */}
                {section === "about" && (
                    <div style={styles.sectionContent}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>
                                <span style={styles.sectionTitleIcon}>👤</span>
                                تعديل بيانات "من أنا"
                            </h2>
                            <div style={styles.sectionActions}>
                                <button
                                    style={styles.backButton}
                                    onClick={() => setSection(null)}
                                >
                                    <span style={styles.backIcon}>↩️</span>
                                    العودة
                                </button>
                            </div>
                        </div>

                        <div style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>العنوان</label>
                                <input
                                    type="text"
                                    value={about.title}
                                    onChange={(e) => updateAboutField("title", e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>العنوان الفرعي</label>
                                <input
                                    type="text"
                                    value={about.subtitle}
                                    onChange={(e) => updateAboutField("subtitle", e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>الوصف</label>
                                {about.description.map((desc, i) => (
                                    <div key={i} style={styles.descriptionItem}>
                                        <textarea
                                            rows={3}
                                            value={desc}
                                            onChange={(e) => {
                                                const newDesc = [...about.description];
                                                newDesc[i] = e.target.value;
                                                updateAboutField("description", newDesc);
                                            }}
                                            style={styles.textarea}
                                        />
                                        <button
                                            style={styles.removeButton}
                                            onClick={() => {
                                                const newDesc = [...about.description];
                                                newDesc.splice(i, 1);
                                                updateAboutField("description", newDesc);
                                            }}
                                        >
                                            حذف
                                        </button>
                                    </div>
                                ))}
                                <button
                                    style={styles.addDescButton}
                                    onClick={() => {
                                        const newDesc = [...about.description, ""];
                                        updateAboutField("description", newDesc);
                                    }}
                                >
                                    + إضافة فقرة جديدة
                                </button>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>نص الزر</label>
                                <input
                                    type="text"
                                    value={about.buttonText}
                                    onChange={(e) => updateAboutField("buttonText", e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>رابط الزر</label>
                                <input
                                    type="text"
                                    value={about.buttonLink}
                                    onChange={(e) => updateAboutField("buttonLink", e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* قسم المهارات والخبرات */}
                {section === "skills" && (
                    <div style={styles.sectionContent}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>
                                <span style={styles.sectionTitleIcon}>🎯</span>
                                تعديل المهارات والخبرات
                            </h2>
                            <div style={styles.sectionActions}>
                                <button
                                    style={styles.backButton}
                                    onClick={() => setSection(null)}
                                >
                                    <span style={styles.backIcon}>↩️</span>
                                    العودة
                                </button>
                            </div>
                        </div>

                        <div style={styles.tabs}>
                            <button
                                style={activeTab === "technical" ? styles.activeTab : styles.tab}
                                onClick={() => setActiveTab("technical")}
                            >
                                المهارات الفنية
                            </button>
                            <button
                                style={activeTab === "experience" ? styles.activeTab : styles.tab}
                                onClick={() => setActiveTab("experience")}
                            >
                                الخبرات
                            </button>
                        </div>

                        {activeTab === "technical" && (
                            <>
                                <div style={styles.skillsGrid}>
                                    {skills.technicalSkills.map((skill, i) => (
                                        <div key={i} style={styles.skillCard}>
                                            <div style={styles.skillHeader}>
                                                <input
                                                    type="text"
                                                    value={skill.name}
                                                    onChange={(e) =>
                                                        updateSkill("technicalSkills", i, "name", e.target.value)
                                                    }
                                                    placeholder="اسم المهارة"
                                                    style={styles.input}
                                                />
                                                <div style={styles.skillControls}>
                                                    <input
                                                        type="color"
                                                        value={skill.color}
                                                        onChange={(e) =>
                                                            updateSkill("technicalSkills", i, "color", e.target.value)
                                                        }
                                                        title="لون"
                                                        style={styles.colorInput}
                                                    />
                                                    <button
                                                        style={styles.removeButton}
                                                        onClick={() => {
                                                            const updatedSkills = [...skills.technicalSkills];
                                                            updatedSkills.splice(i, 1);
                                                            setSkills(prev => ({ ...prev, technicalSkills: updatedSkills }));
                                                        }}
                                                    >
                                                        حذف
                                                    </button>
                                                </div>
                                            </div>

                                            <div style={styles.skillLevel}>
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={100}
                                                    value={skill.level}
                                                    onChange={(e) =>
                                                        updateSkill("technicalSkills", i, "level", +e.target.value)
                                                    }
                                                    style={styles.rangeInput}
                                                />
                                                <span style={styles.levelValue}>{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={addNewTechnicalSkill}
                                    style={styles.addButton}
                                >
                                    + إضافة مهارة جديدة
                                </button>
                            </>
                        )}

                        {activeTab === "experience" && (
                            <>
                                <div style={styles.experienceGrid}>
                                    {skills.experienceItems.map((exp, i) => (
                                        <div key={i} style={styles.experienceCard}>
                                            <div style={styles.expIconInput}>
                                                <input
                                                    type="text"
                                                    value={exp.icon}
                                                    onChange={(e) =>
                                                        updateSkill("experienceItems", i, "icon", e.target.value)
                                                    }
                                                    placeholder="أيقونة"
                                                    style={styles.iconInput}
                                                />
                                            </div>

                                            <div style={styles.expContent}>
                                                <input
                                                    type="text"
                                                    value={exp.title}
                                                    onChange={(e) =>
                                                        updateSkill("experienceItems", i, "title", e.target.value)
                                                    }
                                                    placeholder="عنوان الخبرة"
                                                    style={styles.input}
                                                />

                                                <input
                                                    type="text"
                                                    value={exp.count}
                                                    onChange={(e) =>
                                                        updateSkill("experienceItems", i, "count", e.target.value)
                                                    }
                                                    placeholder="عدد الخبرات"
                                                    style={styles.input}
                                                />
                                            </div>
                                            <button
                                                style={styles.removeButton}
                                                onClick={() => {
                                                    const updatedExp = [...skills.experienceItems];
                                                    updatedExp.splice(i, 1);
                                                    setSkills(prev => ({ ...prev, experienceItems: updatedExp }));
                                                }}
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={addNewExperience}
                                    style={styles.addButton}
                                >
                                    + إضافة خبرة جديدة
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* قسم المشاريع */}
                {section === "projects" && (
                    <div style={styles.sectionContent}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>
                                <span style={styles.sectionTitleIcon}>📂</span>
                                تعديل المشاريع
                            </h2>
                            <div style={styles.sectionActions}>
                                <button
                                    style={styles.addButton}
                                    onClick={addNewProject}
                                >
                                    + إضافة مشروع جديد
                                </button>
                                <button
                                    style={styles.backButton}
                                    onClick={() => setSection(null)}
                                >
                                    <span style={styles.backIcon}>↩️</span>
                                    العودة
                                </button>
                            </div>
                        </div>

                        <div style={styles.projectsContainer}>
                            {projectList.map((proj, i) => (
                                <div key={i} style={styles.projectFormCard}>
                                    <div style={styles.projectHeader}>
                                        <h3 style={styles.projectFormTitle}>مشروع #{i + 1}</h3>
                                        <button
                                            style={styles.removeButton}
                                            onClick={() => {
                                                const updatedProjects = [...projectList];
                                                updatedProjects.splice(i, 1);
                                                setProjectList(updatedProjects);
                                            }}
                                        >
                                            حذف المشروع
                                        </button>
                                    </div>

                                    <div style={styles.form}>
                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>عنوان المشروع</label>
                                            <input
                                                type="text"
                                                value={proj.title}
                                                onChange={(e) => updateProject(i, "title", e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>

                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>التصنيف</label>
                                            <input
                                                type="text"
                                                value={proj.category}
                                                onChange={(e) => updateProject(i, "category", e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>

                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>الوصف</label>
                                            <textarea
                                                rows={3}
                                                value={proj.description}
                                                onChange={(e) => updateProject(i, "description", e.target.value)}
                                                style={styles.textarea}
                                            />
                                        </div>

                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>رابط المشروع</label>
                                            <input
                                                type="text"
                                                value={proj.link}
                                                onChange={(e) => updateProject(i, "link", e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>

                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>مسار الصورة</label>
                                            <input
                                                type="text"
                                                value={proj.image}
                                                onChange={(e) => updateProject(i, "image", e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* قسم إعدادات SEO */}
                {section === "seo" && (
                    <div style={styles.sectionContent}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>
                                <span style={styles.sectionTitleIcon}>🔍</span>
                                إعدادات SEO
                            </h2>
                            <div style={styles.sectionActions}>
                                <button
                                    style={styles.backButton}
                                    onClick={() => setSection(null)}
                                >
                                    <span style={styles.backIcon}>↩️</span>
                                    العودة
                                </button>
                            </div>
                        </div>

                        <div style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>عنوان الموقع</label>
                                <input
                                    type="text"
                                    value={seo.title}
                                    onChange={(e) => updateSeoField("title", e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>وصف الموقع</label>
                                <textarea
                                    rows={3}
                                    value={seo.description}
                                    onChange={(e) => updateSeoField("description", e.target.value)}
                                    style={styles.textarea}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>الكلمات المفتاحية</label>
                                <textarea
                                    rows={3}
                                    value={seo.keywords.join(", ")}
                                    onChange={(e) =>
                                        setSeo(prev => ({
                                            ...prev,
                                            keywords: e.target.value.split(",").map(k => k.trim())
                                        }))
                                    }
                                    style={styles.textarea}
                                />
                                <small style={styles.hint}>اكتب الكلمات مفصولة بفواصل (مثلاً: تصميم, شعار, هوية بصرية)</small>
                            </div>

                            <div style={styles.previewCard}>
                                <h3 style={styles.previewTitle}>معاينة محركات البحث</h3>
                                <div style={styles.seoPreview}>
                                    <h4 style={styles.previewSiteTitle}>{seo.title}</h4>
                                    <p style={styles.previewSiteUrl}>https://your-portfolio.com</p>
                                    <p style={styles.previewDescription}>{seo.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {showNotification && (
                <div style={styles.notification}>
                    {notificationText}
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    // تسجيل الدخول
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fkslks",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    loginCard: {
        backgroundColor: "#777",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "40px 50px",
        width: "100%",
        maxWidth: "450px",
        textAlign: "center",
    },
    logo: {
        marginBottom: "30px",
    },
    logoIcon: {
        fontSize: "64px",
        marginBottom: "15px",
        color: "#4f46e5",
    },
    logoText: {
        fontSize: "24px",
        fontWeight: 600,
        color: "#2d3748",
        margin: 0,
    },
    inputGroup: {
        marginBottom: "20px",
        textAlign: "right",
        backgroundColor: "999",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: 500,
        color: "#000",
        fontSize: "14px",
    },
    input: {
        width: "100%",
        padding: "12px 15px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solidrgb(4, 56, 123)",
        backgroundColor: "#555",
        transition: "all 0.3s ease",
        outline: "none",
    },
    loginButton: {
        width: "100%",
        padding: "14px 20px",
        fontSize: "16px",
        fontWeight: 600,
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginTop: "10px",
    },
    footer: {
        marginTop: "30px",
        paddingTop: "20px",
        borderTop: "1px solid #e2e8f0",
    },
    footerText: {
        fontSize: "14px",
        color: "#718096",
    },

    // لوحة التحكم الرئيسية
    adminContainer: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        zIndex: 100,
        height: "70px", 
    },
    headerLeft: {
        flex: 1,
    },
    headerTitle: {
        fontSize: "20px",
        fontWeight: 600,
        color: "#2d3748",
        margin: 0,
    },
    headerSubtitle: {
        fontSize: "14px",
        color: "#718096",
        margin: "5px 0 0 0",
    },
    headerRight: {
        display: "flex",
        gap: "15px",
    },
    saveButton: {
        padding: "10px 20px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#10b981",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    savingButton: {
        padding: "10px 20px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#94a3b8",
        color: "#ffffff",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "not-allowed",
    },
    downloadButton: {
        padding: "10px 20px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #4f46e5",
        backgroundColor: "transparent",
        color: "#4f46e5",
        cursor: "pointer",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    logoutButton: {
        padding: "10px 20px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #e53e3e",
        backgroundColor: "transparent",
        color: "#e53e3e",
        cursor: "pointer",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    saveIcon: {
        fontSize: "16px",
    },
    downloadIcon: {
        fontSize: "16px",
    },
    logoutIcon: {
        fontSize: "16px",
    },
    spinner: {
        display: "inline-block",
        width: "14px",
        height: "14px",
        border: "2px solid rgba(255,255,255,0.3)",
        borderRadius: "50%",
        borderTopColor: "#fff",
        animation: "spin 1s linear infinite",
    },

    // القائمة الجانبية
    sidebar: {
        width: "280px",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        minHeight: "100vh",
        position: "fixed",
        top: "70px",
        bottom: 0,
        paddingTop: "20px",
    },
    userInfo: {
        padding: "20px 25px",
        textAlign: "center",
        borderBottom: "1px solid #334155",
    },
    avatar: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "#4f46e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 15px",
    },
    avatarIcon: {
        fontSize: "32px",
    },
    userName: {
        fontSize: "18px",
        fontWeight: 600,
        margin: "0 0 5px",
    },
    userRole: {
        fontSize: "14px",
        color: "#94a3b8",
        margin: 0,
    },
    nav: {
        padding: "20px 0",
    },
    navList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    navItem: {
        padding: "12px 25px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    activeNavItem: {
        padding: "12px 25px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#334155",
        borderLeft: "4px solid #4f46e5",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    navIcon: {
        fontSize: "18px",
    },
    sidebarFooter: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #334155",
    },
    sidebarFooterText: {
        fontSize: "12px",
        color: "#94a3b8",
    },

    // المحتوى الرئيسي
    mainContent: {
        flex: 1,
        marginLeft: "280px",
        marginTop: "70px",
        padding: "30px",
    },
    dashboard: {
        backgroundColor: "#999",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        padding: "30px",
    },
    dashboardTitle: {
        fontSize: "24px",
        fontWeight: 600,
        color: "#2d3748",
        margin: "0 0 25px",
        paddingBottom: "15px",
        borderBottom: "1px solid #e2e8f0",
    },
    statusCard: {
        backgroundColor: "#f0fdfa",
        borderRadius: "12px",
        padding: "25px",
        marginBottom: "30px",
        border: "1px solid #ccfbf1",
    },
    statusIcon: {
        fontSize: "48px",
        color: "#0d9488",
        marginBottom: "15px",
        textAlign: "center",
    },
    statusTitle: {
        fontSize: "20px",
        fontWeight: 600,
        color: "#0f766e",
        margin: "0 0 10px",
        textAlign: "center",
    },
    statusText: {
        fontSize: "16px",
        color: "#64748b",
        margin: "0 0 20px",
        textAlign: "center",
        lineHeight: "1.6",
    },
    statusActions: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
    },
    statsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "30px",
    },
    statCard: {
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.3s ease",
    },
    statCardHover: {
        transform: "translateY(-5px)",
    },
    statIcon: {
        fontSize: "32px",
        marginBottom: "10px",
        color: "#4f46e5",
    },
    statValue: {
        fontSize: "28px",
        fontWeight: 700,
        color: "#1e293b",
        margin: "0 0 5px",
    },
    statLabel: {
        fontSize: "14px",
        color: "#64748b",
        margin: 0,
    },
    quickActions: {
        marginBottom: "30px",
    },
    sectionTitle: {
        fontSize: "20px",
        fontWeight: 600,
        color: "#2d3748",
        margin: "0 0 15px",
    },
    actionButtons: {
        display: "flex",
        gap: "15px",
    },
    actionButton: {
        padding: "12px 20px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 500,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    actionIcon: {
        fontSize: "16px",
    },

    // محتوى الأقسام
    sectionContent: {
        backgroundColor: "#999",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        padding: "30px",
        marginBottom: "30px",
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        paddingBottom: "15px",
        borderBottom: "1px solid #e2e8f0",
    },
    sectionTitle: {
        fontSize: "22px",
        fontWeight: 600,
        color: "#2d3748",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    sectionTitleIcon: {
        fontSize: "24px",
    },
    sectionActions: {
        display: "flex",
        gap: "15px",
    },
    backButton: {
        padding: "8px 16px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        backgroundColor: "transparent",
        color: "#4a5568",
        cursor: "pointer",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    backIcon: {
        fontSize: "16px",
    },
    addButton: {
        padding: "10px 20px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 500,
    },
    removeButton: {
        padding: "6px 12px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#ef4444",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 500,
    },

    // المهارات والخبرات
    tabs: {
        display: "flex",
        marginBottom: "20px",
        borderBottom: "1px solid #e2e8f0",
    },
    tab: {
        padding: "10px 20px",
        fontSize: "15px",
        fontWeight: 500,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#64748b",
        borderBottom: "2px solid transparent",
    },
    activeTab: {
        padding: "10px 20px",
        fontSize: "15px",
        fontWeight: 500,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#4f46e5",
        borderBottom: "2px solid #4f46e5",
    },
    skillsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginBottom: "20px",
    },
    skillCard: {
        backgroundColor: "#f8fafc",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    skillHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
        gap: "10px",
    },
    skillControls: {
        display: "flex",
        gap: "10px",
    },
    colorInput: {
        width: "40px",
        height: "40px",
        padding: 0,
        border: "none",
        cursor: "pointer",
    },
    skillLevel: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },
    rangeInput: {
        flex: 1,
        height: "8px",
        borderRadius: "4px",
    },
    levelValue: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#4a5568",
        minWidth: "40px",
    },
    experienceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "20px",
    },
    experienceCard: {
        backgroundColor: "#444",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        gap: "15px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
        position: "relative",
    },
    expIconInput: {
        width: "50px",
        height: "50px",
        backgroundColor: "#e0f2fe",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconInput: {
        width: "100%",
        textAlign: "center",
        backgroundColor: "transparent",
        border: "none",
        fontSize: "20px",
        fontWeight: "bold",
    },
    expContent: {
        flex: 1,
    },

    // المشاريع
    projectsContainer: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px",
        
    },
    projectFormCard: {
        backgroundColor: "#999",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    projectHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    projectFormTitle: {
        fontSize: "18px",
        fontWeight: 600,
        color: "#999",
        margin: 0,
    },

    // إعدادات SEO
    previewCard: {
        backgroundColor: "#777",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
    },
    previewTitle: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#1e293b",
        margin: "0 0 15px",
    },
    seoPreview: {
        backgroundColor: "#999",
        borderRadius: "8px",
        padding: "15px",
        border: "1px solid #e2e8f0",
    },
    previewSiteTitle: {
        fontSize: "18px",
        color: "#1a0dab",
        margin: "0 0 5px",
    },
    previewSiteUrl: {
        fontSize: "14px",
        color: "#006621",
        margin: "0 0 8px",
    },
    previewDescription: {
        fontSize: "14px",
        color: "#999",
        margin: 0,
    },
    hint: {
        display: "block",
        fontSize: "12px",
        color: "#718096",
        marginTop: "5px",
    },

    // إشعارات
    notification: {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "15px 25px",
        backgroundColor: "#10b981",
        color: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        fontSize: "14px",
        fontWeight: 500,
    },

    // عناصر عامة
    form: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "999",
        gap: "20px",
    },
    textarea: {
        width: "100%",
        padding: "12px 15px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid rgb(0, 0, 0)", 
        backgroundColor: "#0119",
        transition: "all 0.3s ease",
        outline: "none",
        minHeight: "100px",
        resize: "vertical",
        marginBottom: "20px", // تباعد خارجي من تحت (optional)
        lineHeight: "1.8", // تباعد بين السطور داخل textarea (optional)
    },
    descriptionItem: {
        display: "flex",
        gap: "10px",
        backgroundColor: "000",
        alignItems: "flex-start",
    },
    addDescButton: {
        padding: "8px 12px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px dashed #4f46e5",
        backgroundColor: "transparent",
        color: "#4f46e5",
        cursor: "pointer",
        fontWeight: 500,
        alignSelf: "flex-start",
    },
    addButton: {
        padding: "10px 20px",
        fontSize: "14px",
        borderRadius: "6px",

        border: "none",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 500,
        marginTop: "10px",
        
    },
};

// إضافة أنيميشن للسبينر
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}