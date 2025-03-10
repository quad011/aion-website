export function useLinkResolver() {
  const linkResolver = (doc) => {
    if (!doc || !doc.type) return "/";

    switch (doc.type) {
      case "our_solutions":
        return "/our-solutions";
      case "article_solution":
        return doc.uid ? `/our-solutions/${doc.uid}` : "/our-solutions";
      case "page_default":
        return doc.uid ? `/${doc.uid}` : "/";
      default:
        return "/";
    }
  };

  return { linkResolver };
}
