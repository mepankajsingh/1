var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = "/build/css-bundle-CFCMAFXL.css";

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var links = () => [
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {}),
      /* @__PURE__ */ jsx2(ColorSchemeScript, {})
    ] }),
    /* @__PURE__ */ jsx2("body", { children: /* @__PURE__ */ jsxs(MantineProvider, { children: [
      /* @__PURE__ */ jsx2(Notifications, {}),
      /* @__PURE__ */ jsx2(Outlet, {}),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] }) })
  ] });
}

// app/routes/category.$categoryId.tsx
var category_categoryId_exports = {};
__export(category_categoryId_exports, {
  default: () => CategoryPage,
  loader: () => loader
});
import { json } from "@remix-run/node";
import { useLoaderData as useLoaderData2 } from "@remix-run/react";
import { SimpleGrid, Title as Title3, Text as Text2, Group as Group3, TextInput, Select } from "@mantine/core";
import { useState } from "react";

// app/components/Layout.tsx
import { AppShell, Burger, Group, Title, Button, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Layout({ children }) {
  let [opened, { toggle }] = useDisclosure();
  return /* @__PURE__ */ jsxs2(
    AppShell,
    {
      header: { height: 60 },
      navbar: {
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      },
      padding: "md",
      children: [
        /* @__PURE__ */ jsx3(AppShell.Header, { children: /* @__PURE__ */ jsxs2(Group, { h: "100%", px: "md", justify: "space-between", children: [
          /* @__PURE__ */ jsxs2(Group, { children: [
            /* @__PURE__ */ jsx3(Burger, { opened, onClick: toggle, hiddenFrom: "sm", size: "sm" }),
            /* @__PURE__ */ jsx3(Title, { order: 3, children: "AI Directory" })
          ] }),
          /* @__PURE__ */ jsx3(Group, { children: /* @__PURE__ */ jsx3(Button, { component: Link, to: "/tools/new", variant: "filled", color: "blue", children: "Add New Tool" }) })
        ] }) }),
        /* @__PURE__ */ jsxs2(AppShell.Navbar, { p: "md", children: [
          /* @__PURE__ */ jsx3(Title, { order: 4, mb: "md", children: "Categories" }),
          /* @__PURE__ */ jsx3(Button, { component: Link, to: "/", variant: "subtle", fullWidth: !0, mb: "xs", children: "All Tools" }),
          /* @__PURE__ */ jsx3(Button, { component: Link, to: "/category/chatbots", variant: "subtle", fullWidth: !0, mb: "xs", children: "Chatbots" }),
          /* @__PURE__ */ jsx3(Button, { component: Link, to: "/category/image-generation", variant: "subtle", fullWidth: !0, mb: "xs", children: "Image Generation" }),
          /* @__PURE__ */ jsx3(Button, { component: Link, to: "/category/text-to-speech", variant: "subtle", fullWidth: !0, mb: "xs", children: "Text to Speech" }),
          /* @__PURE__ */ jsx3(Button, { component: Link, to: "/category/code-assistants", variant: "subtle", fullWidth: !0, mb: "xs", children: "Code Assistants" })
        ] }),
        /* @__PURE__ */ jsx3(AppShell.Main, { children: /* @__PURE__ */ jsx3(Container, { size: "xl", children }) })
      ]
    }
  );
}

// app/components/ToolCard.tsx
import { Card, Image, Text, Badge, Group as Group2, Button as Button2, Title as Title2 } from "@mantine/core";
import { Link as Link2 } from "@remix-run/react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ToolCard({ tool }) {
  return /* @__PURE__ */ jsxs3(Card, { shadow: "sm", padding: "lg", radius: "md", withBorder: !0, children: [
    /* @__PURE__ */ jsx4(Card.Section, { children: /* @__PURE__ */ jsx4(
      Image,
      {
        src: tool.image_url || "https://placehold.co/600x400?text=AI+Tool",
        height: 160,
        alt: tool.name
      }
    ) }),
    /* @__PURE__ */ jsxs3(Group2, { justify: "space-between", mt: "md", mb: "xs", children: [
      /* @__PURE__ */ jsx4(Title2, { order: 4, children: tool.name }),
      /* @__PURE__ */ jsx4(Badge, { color: "blue", children: tool.category })
    ] }),
    /* @__PURE__ */ jsx4(Text, { size: "sm", c: "dimmed", lineClamp: 3, children: tool.description }),
    /* @__PURE__ */ jsxs3(Text, { size: "sm", mt: "md", children: [
      /* @__PURE__ */ jsx4("strong", { children: "Pricing:" }),
      " ",
      tool.pricing
    ] }),
    /* @__PURE__ */ jsx4(Group2, { mt: "md", children: /* @__PURE__ */ jsx4(Button2, { component: Link2, to: `/tools/${tool.id}`, variant: "light", color: "blue", fullWidth: !0, children: "View Details" }) })
  ] });
}

// app/utils/supabase.server.ts
import { createClient } from "@supabase/supabase-js";
var supabaseUrl = "https://srfzoifcvqckpxqfiuau.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZnpvaWZjdnFja3B4cWZpdWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTIwMTMsImV4cCI6MjA1NTkyODAxM30.leqQMCLOzdDzfnTGi4DXBuYhdzg4ULSVer38SGI5NL0", supabase = createClient(supabaseUrl, supabaseKey);
async function getAITools() {
  let { data, error } = await supabase.from("ai_tools").select("*").order("created_at", { ascending: !1 });
  return error ? (console.error("Error fetching AI tools:", error), []) : data;
}
async function getAIToolById(id) {
  let { data, error } = await supabase.from("ai_tools").select("*").eq("id", id).single();
  return error ? (console.error("Error fetching AI tool:", error), null) : data;
}
async function createAITool(tool) {
  let { data, error } = await supabase.from("ai_tools").insert([tool]).select();
  return error ? (console.error("Error creating AI tool:", error), null) : data[0];
}
async function updateAITool(id, tool) {
  let { data, error } = await supabase.from("ai_tools").update(tool).eq("id", id).select();
  return error ? (console.error("Error updating AI tool:", error), null) : data[0];
}
async function deleteAITool(id) {
  let { error } = await supabase.from("ai_tools").delete().eq("id", id);
  return error ? (console.error("Error deleting AI tool:", error), !1) : !0;
}

// app/routes/category.$categoryId.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var loader = async ({ params }) => {
  let allTools = await getAITools(), categoryId = params.categoryId, tools = allTools.filter(
    (tool) => tool.category.toLowerCase() === categoryId?.toLowerCase()
  );
  return json({ tools, category: categoryId });
};
function CategoryPage() {
  let { tools, category } = useLoaderData2(), [searchQuery, setSearchQuery] = useState(""), [sortBy, setSortBy] = useState("newest"), sortedTools = [...tools.filter(
    (tool) => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )].sort((a, b) => sortBy === "newest" ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime() : sortBy === "oldest" ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() : sortBy === "name" ? a.name.localeCompare(b.name) : 0), formattedCategory = category?.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return /* @__PURE__ */ jsxs4(Layout, { children: [
    /* @__PURE__ */ jsxs4(Title3, { order: 1, mb: "md", children: [
      formattedCategory,
      " AI Tools"
    ] }),
    /* @__PURE__ */ jsxs4(Text2, { mb: "xl", children: [
      "Browse AI tools in the ",
      formattedCategory,
      " category."
    ] }),
    /* @__PURE__ */ jsxs4(Group3, { mb: "xl", children: [
      /* @__PURE__ */ jsx5(
        TextInput,
        {
          placeholder: "Search tools...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.currentTarget.value),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ jsx5(
        Select,
        {
          placeholder: "Sort by",
          value: sortBy,
          onChange: setSortBy,
          data: [
            { value: "newest", label: "Newest First" },
            { value: "oldest", label: "Oldest First" },
            { value: "name", label: "Name (A-Z)" }
          ],
          style: { width: 200 }
        }
      )
    ] }),
    sortedTools.length === 0 ? /* @__PURE__ */ jsx5(Text2, { ta: "center", fz: "lg", mt: "xl", children: "No tools found in this category." }) : /* @__PURE__ */ jsx5(SimpleGrid, { cols: { base: 1, sm: 2, md: 3 }, spacing: "lg", children: sortedTools.map((tool) => /* @__PURE__ */ jsx5(ToolCard, { tool }, tool.id)) })
  ] });
}

// app/routes/tools.$id.edit.tsx
var tools_id_edit_exports = {};
__export(tools_id_edit_exports, {
  action: () => action,
  default: () => EditTool,
  loader: () => loader2
});
import { json as json2, redirect } from "@remix-run/node";
import { useLoaderData as useLoaderData3, useActionData, useNavigation } from "@remix-run/react";
import { Title as Title4, Paper } from "@mantine/core";

// app/components/ToolForm.tsx
import { TextInput as TextInput2, Textarea, Button as Button3, Group as Group4, Select as Select2, MultiSelect, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var CATEGORIES = [
  { value: "chatbots", label: "Chatbots" },
  { value: "image-generation", label: "Image Generation" },
  { value: "text-to-speech", label: "Text to Speech" },
  { value: "code-assistants", label: "Code Assistants" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "other", label: "Other" }
], PRICING_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "subscription", label: "Subscription" }
], FEATURE_OPTIONS = [
  { value: "api", label: "API Access" },
  { value: "mobile", label: "Mobile App" },
  { value: "desktop", label: "Desktop App" },
  { value: "browser-extension", label: "Browser Extension" },
  { value: "offline", label: "Offline Support" },
  { value: "customization", label: "Customization" }
];
function ToolForm({ initialValues = {}, onSubmit, isSubmitting = !1 }) {
  let form = useForm({
    initialValues: {
      name: initialValues.name || "",
      description: initialValues.description || "",
      url: initialValues.url || "",
      image_url: initialValues.image_url || "",
      category: initialValues.category || "",
      pricing: initialValues.pricing || "",
      features: initialValues.features || []
    },
    validate: {
      name: (value) => value ? null : "Name is required",
      description: (value) => value ? null : "Description is required",
      url: (value) => /^https?:\/\//.test(value) ? null : "URL must start with http:// or https://",
      category: (value) => value ? null : "Category is required"
    }
  });
  return /* @__PURE__ */ jsx6(Box, { maw: 600, mx: "auto", children: /* @__PURE__ */ jsxs5("form", { onSubmit: form.onSubmit(onSubmit), children: [
    /* @__PURE__ */ jsx6(
      TextInput2,
      {
        label: "Name",
        placeholder: "Tool name",
        required: !0,
        ...form.getInputProps("name"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(
      Textarea,
      {
        label: "Description",
        placeholder: "Describe what this AI tool does",
        required: !0,
        minRows: 3,
        ...form.getInputProps("description"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(
      TextInput2,
      {
        label: "URL",
        placeholder: "https://example.com",
        required: !0,
        ...form.getInputProps("url"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(
      TextInput2,
      {
        label: "Image URL",
        placeholder: "https://example.com/image.jpg",
        ...form.getInputProps("image_url"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(
      Select2,
      {
        label: "Category",
        placeholder: "Select a category",
        data: CATEGORIES,
        required: !0,
        ...form.getInputProps("category"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(
      Select2,
      {
        label: "Pricing",
        placeholder: "Select pricing model",
        data: PRICING_OPTIONS,
        ...form.getInputProps("pricing"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(
      MultiSelect,
      {
        label: "Features",
        placeholder: "Select features",
        data: FEATURE_OPTIONS,
        ...form.getInputProps("features"),
        mb: "md"
      }
    ),
    /* @__PURE__ */ jsx6(Group4, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ jsx6(Button3, { type: "submit", loading: isSubmitting, children: initialValues.id ? "Update Tool" : "Add Tool" }) })
  ] }) });
}

// app/routes/tools.$id.edit.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var loader2 = async ({ params }) => {
  let tool = await getAIToolById(params.id);
  if (!tool)
    throw new Response("Not Found", { status: 404 });
  return json2({ tool });
}, action = async ({ params, request }) => {
  let formData = await request.formData(), toolData = Object.fromEntries(formData);
  return typeof toolData.features == "string" && (toolData.features = JSON.parse(toolData.features)), await updateAITool(params.id, toolData) ? redirect(`/tools/${params.id}`) : json2({ error: "Failed to update tool" }, { status: 400 });
};
function EditTool() {
  let { tool } = useLoaderData3(), actionData = useActionData(), isSubmitting = useNavigation().state === "submitting";
  return /* @__PURE__ */ jsxs6(Layout, { children: [
    /* @__PURE__ */ jsx7(Title4, { order: 1, mb: "xl", children: "Edit AI Tool" }),
    /* @__PURE__ */ jsx7(Paper, { shadow: "xs", p: "md", children: /* @__PURE__ */ jsx7(
      ToolForm,
      {
        initialValues: tool,
        onSubmit: (values) => {
          let formData = new FormData();
          return Object.entries(values).forEach(([key, value]) => {
            key === "features" && Array.isArray(value) ? formData.append(key, JSON.stringify(value)) : value != null && formData.append(key, value);
          }), formData;
        },
        isSubmitting
      }
    ) })
  ] });
}

// app/routes/tools.$id.tsx
var tools_id_exports = {};
__export(tools_id_exports, {
  action: () => action2,
  default: () => ToolDetails,
  loader: () => loader3
});
import { json as json3, redirect as redirect2 } from "@remix-run/node";
import { useLoaderData as useLoaderData4, useNavigate } from "@remix-run/react";
import { Card as Card2, Image as Image2, Text as Text3, Badge as Badge2, Group as Group5, Button as Button4, Title as Title5, Stack, List, Flex, Box as Box2 } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var loader3 = async ({ params }) => {
  let tool = await getAIToolById(params.id);
  if (!tool)
    throw new Response("Not Found", { status: 404 });
  return json3({ tool });
}, action2 = async ({ params, request }) => (await request.formData()).get("intent") === "delete" && params.id ? (await deleteAITool(params.id), redirect2("/")) : null;
function ToolDetails() {
  let { tool } = useLoaderData4(), navigate = useNavigate(), handleDelete = async () => {
    if (confirm("Are you sure you want to delete this tool?")) {
      let formData = new FormData();
      formData.append("intent", "delete");
      try {
        await fetch(`/tools/${tool.id}`, {
          method: "POST",
          body: formData
        }), notifications.show({
          title: "Success",
          message: "Tool deleted successfully",
          color: "green"
        }), navigate("/");
      } catch {
        notifications.show({
          title: "Error",
          message: "Failed to delete tool",
          color: "red"
        });
      }
    }
  };
  return /* @__PURE__ */ jsx8(Layout, { children: /* @__PURE__ */ jsxs7(Card2, { shadow: "sm", padding: "lg", radius: "md", withBorder: !0, children: [
    /* @__PURE__ */ jsxs7(Flex, { justify: "space-between", align: "flex-start", children: [
      /* @__PURE__ */ jsx8(Title5, { order: 1, children: tool.name }),
      /* @__PURE__ */ jsxs7(Group5, { children: [
        /* @__PURE__ */ jsx8(
          Button4,
          {
            variant: "outline",
            color: "blue",
            onClick: () => navigate(`/tools/${tool.id}/edit`),
            children: "Edit"
          }
        ),
        /* @__PURE__ */ jsx8(
          Button4,
          {
            variant: "outline",
            color: "red",
            onClick: handleDelete,
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs7(Group5, { mt: "md", children: [
      /* @__PURE__ */ jsx8(Badge2, { color: "blue", size: "lg", children: tool.category }),
      /* @__PURE__ */ jsx8(Badge2, { color: "gray", size: "lg", children: tool.pricing })
    ] }),
    /* @__PURE__ */ jsx8(Card2.Section, { mt: "md", children: /* @__PURE__ */ jsx8(
      Image2,
      {
        src: tool.image_url || "https://placehold.co/800x400?text=AI+Tool",
        height: 300,
        alt: tool.name
      }
    ) }),
    /* @__PURE__ */ jsxs7(Stack, { mt: "xl", spacing: "md", children: [
      /* @__PURE__ */ jsxs7(Box2, { children: [
        /* @__PURE__ */ jsx8(Title5, { order: 3, children: "Description" }),
        /* @__PURE__ */ jsx8(Text3, { children: tool.description })
      ] }),
      /* @__PURE__ */ jsxs7(Box2, { children: [
        /* @__PURE__ */ jsx8(Title5, { order: 3, children: "Website" }),
        /* @__PURE__ */ jsx8(Text3, { component: "a", href: tool.url, target: "_blank", rel: "noopener noreferrer", c: "blue", children: tool.url })
      ] }),
      tool.features && tool.features.length > 0 && /* @__PURE__ */ jsxs7(Box2, { children: [
        /* @__PURE__ */ jsx8(Title5, { order: 3, children: "Features" }),
        /* @__PURE__ */ jsx8(List, { children: tool.features.map((feature, index) => /* @__PURE__ */ jsx8(List.Item, { children: feature }, index)) })
      ] })
    ] })
  ] }) });
}

// app/routes/tools.new.tsx
var tools_new_exports = {};
__export(tools_new_exports, {
  action: () => action3,
  default: () => NewTool
});
import { redirect as redirect3, json as json4 } from "@remix-run/node";
import { useActionData as useActionData2, useNavigation as useNavigation2 } from "@remix-run/react";
import { Title as Title6, Paper as Paper2 } from "@mantine/core";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var action3 = async ({ request }) => {
  let formData = await request.formData(), toolData = Object.fromEntries(formData);
  typeof toolData.features == "string" && (toolData.features = JSON.parse(toolData.features));
  let newTool = await createAITool(toolData);
  return newTool ? redirect3(`/tools/${newTool.id}`) : json4({ error: "Failed to create tool" }, { status: 400 });
};
function NewTool() {
  let actionData = useActionData2(), isSubmitting = useNavigation2().state === "submitting";
  return /* @__PURE__ */ jsxs8(Layout, { children: [
    /* @__PURE__ */ jsx9(Title6, { order: 1, mb: "xl", children: "Add New AI Tool" }),
    /* @__PURE__ */ jsx9(Paper2, { shadow: "xs", p: "md", children: /* @__PURE__ */ jsx9(
      ToolForm,
      {
        onSubmit: (values) => {
          let formData = new FormData();
          return Object.entries(values).forEach(([key, value]) => {
            key === "features" && Array.isArray(value) ? formData.append(key, JSON.stringify(value)) : value != null && formData.append(key, value);
          }), formData;
        },
        isSubmitting
      }
    ) })
  ] });
}

// app/routes/_error.tsx
var error_exports = {};
__export(error_exports, {
  default: () => ErrorBoundary
});
import { useRouteError, isRouteErrorResponse, Link as Link3 } from "@remix-run/react";
import { Title as Title7, Text as Text4, Button as Button5, Container as Container2, Group as Group6 } from "@mantine/core";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function ErrorBoundary() {
  let error = useRouteError(), title = "Something went wrong", message = "An unexpected error occurred. Please try again later.";
  return isRouteErrorResponse(error) && (error.status === 404 ? (title = "Page not found", message = "The page you are looking for doesn't exist or has been moved.") : error.status === 401 ? (title = "Unauthorized", message = "You must be logged in to view this page.") : error.status === 403 && (title = "Forbidden", message = "You don't have permission to access this resource.")), /* @__PURE__ */ jsxs9(Container2, { size: "md", py: 80, children: [
    /* @__PURE__ */ jsx10(Title7, { ta: "center", order: 1, children: title }),
    /* @__PURE__ */ jsx10(Text4, { c: "dimmed", size: "lg", ta: "center", mt: "md", children: message }),
    /* @__PURE__ */ jsx10(Group6, { justify: "center", mt: "xl", children: /* @__PURE__ */ jsx10(Button5, { component: Link3, to: "/", size: "md", children: "Back to Home" }) })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader4
});
import { json as json5 } from "@remix-run/node";
import { useLoaderData as useLoaderData5 } from "@remix-run/react";
import { SimpleGrid as SimpleGrid2, Title as Title8, Text as Text5, Group as Group7, TextInput as TextInput3, Select as Select3 } from "@mantine/core";
import { useState as useState2 } from "react";
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var loader4 = async () => {
  let tools = await getAITools();
  return json5({ tools });
};
function Index() {
  let { tools } = useLoaderData5(), [searchQuery, setSearchQuery] = useState2(""), [sortBy, setSortBy] = useState2("newest"), sortedTools = [...tools.filter(
    (tool) => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )].sort((a, b) => sortBy === "newest" ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime() : sortBy === "oldest" ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() : sortBy === "name" ? a.name.localeCompare(b.name) : 0);
  return /* @__PURE__ */ jsxs10(Layout, { children: [
    /* @__PURE__ */ jsx11(Title8, { order: 1, mb: "md", children: "AI Tools Directory" }),
    /* @__PURE__ */ jsx11(Text5, { mb: "xl", children: "Discover the latest and greatest AI tools for various use cases." }),
    /* @__PURE__ */ jsxs10(Group7, { mb: "xl", children: [
      /* @__PURE__ */ jsx11(
        TextInput3,
        {
          placeholder: "Search tools...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.currentTarget.value),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ jsx11(
        Select3,
        {
          placeholder: "Sort by",
          value: sortBy,
          onChange: setSortBy,
          data: [
            { value: "newest", label: "Newest First" },
            { value: "oldest", label: "Oldest First" },
            { value: "name", label: "Name (A-Z)" }
          ],
          style: { width: 200 }
        }
      )
    ] }),
    sortedTools.length === 0 ? /* @__PURE__ */ jsx11(Text5, { ta: "center", fz: "lg", mt: "xl", children: "No tools found. Try a different search term." }) : /* @__PURE__ */ jsx11(SimpleGrid2, { cols: { base: 1, sm: 2, md: 3 }, spacing: "lg", children: sortedTools.map((tool) => /* @__PURE__ */ jsx11(ToolCard, { tool }, tool.id)) })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-2REQER4X.js", imports: ["/build/_shared/chunk-NFSG2BAM.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-JB3SURIS.js", imports: ["/build/_shared/chunk-Z2EBZV2G.js", "/build/_shared/chunk-QGQWTZ4L.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_error": { id: "routes/_error", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/_error-IWXUMGFY.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-5ADWFMDV.js", imports: ["/build/_shared/chunk-2GE4ENNV.js", "/build/_shared/chunk-ZLS3JL5P.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/category.$categoryId": { id: "routes/category.$categoryId", parentId: "root", path: "category/:categoryId", index: void 0, caseSensitive: void 0, module: "/build/routes/category.$categoryId-A2OTFMII.js", imports: ["/build/_shared/chunk-2GE4ENNV.js", "/build/_shared/chunk-ZLS3JL5P.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/tools.$id": { id: "routes/tools.$id", parentId: "root", path: "tools/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/tools.$id-ZTXO3W2J.js", imports: ["/build/_shared/chunk-ZLS3JL5P.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/tools.$id.edit": { id: "routes/tools.$id.edit", parentId: "routes/tools.$id", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/tools.$id.edit-NN6FC5S4.js", imports: ["/build/_shared/chunk-JBYXBBNX.js", "/build/_shared/chunk-QGQWTZ4L.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/tools.new": { id: "routes/tools.new", parentId: "root", path: "tools/new", index: void 0, caseSensitive: void 0, module: "/build/routes/tools.new-DVLXGCDC.js", imports: ["/build/_shared/chunk-JBYXBBNX.js", "/build/_shared/chunk-ZLS3JL5P.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "a868eaf1", hmr: void 0, url: "/build/manifest-A868EAF1.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/category.$categoryId": {
    id: "routes/category.$categoryId",
    parentId: "root",
    path: "category/:categoryId",
    index: void 0,
    caseSensitive: void 0,
    module: category_categoryId_exports
  },
  "routes/tools.$id.edit": {
    id: "routes/tools.$id.edit",
    parentId: "routes/tools.$id",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: tools_id_edit_exports
  },
  "routes/tools.$id": {
    id: "routes/tools.$id",
    parentId: "root",
    path: "tools/:id",
    index: void 0,
    caseSensitive: void 0,
    module: tools_id_exports
  },
  "routes/tools.new": {
    id: "routes/tools.new",
    parentId: "root",
    path: "tools/new",
    index: void 0,
    caseSensitive: void 0,
    module: tools_new_exports
  },
  "routes/_error": {
    id: "routes/_error",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: error_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
