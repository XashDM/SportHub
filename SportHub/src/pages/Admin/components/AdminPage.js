import React from 'react'
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"
import ArticleMenu from "../../../modules/ArticleMenu"

export default function AdminPage() {
    const languages = [
        {
          label: 'English',
          icon: 'EN.svg',
          value: 0
        },
        {
          label: 'German',
          icon: 'DE.svg',
          value: 1
        },
        {
          label: 'French',
          icon: 'FR.svg',
          value: 2
        }
    ]

    const tabsData = [
      {
        alt: "",
        headline: "",
        caption: "",
        content: "<p>English content</p>"
      },
      {
        alt: "cooles Bild",
        headline: "Überschrift",
        caption: "Überschrift",
        content: "<p>German content</p>"
      },
      {
        alt: "photo sympa",
        headline: "gros titre",
        caption: "légende",
        content: "<p>French content</p>"
      }
    ]

    return (
        <div>
            <AdminHeader />
            <HorizontalAdminMenu />
            <VerticalAdminMenu />
            <ArticleMenu languages={languages} tabsData={tabsData}/>
        </div>
    )
}
