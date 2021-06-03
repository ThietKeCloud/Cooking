PGDMP         #                 y            Academy    13.1    13.1 Y    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    16836    Academy    DATABASE     m   CREATE DATABASE "Academy" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "Academy";
                postgres    false            �            1259    16858    Carts    TABLE     �   CREATE TABLE public."Carts" (
    id integer NOT NULL,
    userid integer,
    subtotal integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Carts";
       public         heap    postgres    false            �            1259    16856    Carts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Carts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Carts_id_seq";
       public          postgres    false    205            .           0    0    Carts_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Carts_id_seq" OWNED BY public."Carts".id;
          public          postgres    false    204            �            1259    16942 
   Categories    TABLE     �   CREATE TABLE public."Categories" (
    id integer NOT NULL,
    namecategory character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Categories";
       public         heap    postgres    false            �            1259    16940    Categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Categories_id_seq";
       public          postgres    false    223            /           0    0    Categories_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;
          public          postgres    false    222            �            1259    16866    CourseCarts    TABLE     �   CREATE TABLE public."CourseCarts" (
    id integer NOT NULL,
    courseid integer,
    cartid integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."CourseCarts";
       public         heap    postgres    false            �            1259    16864    CourseCarts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CourseCarts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."CourseCarts_id_seq";
       public          postgres    false    207            0           0    0    CourseCarts_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."CourseCarts_id_seq" OWNED BY public."CourseCarts".id;
          public          postgres    false    206            �            1259    16874    CourseUsers    TABLE     �   CREATE TABLE public."CourseUsers" (
    id integer NOT NULL,
    courseid integer,
    userid integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."CourseUsers";
       public         heap    postgres    false            �            1259    16872    CourseUsers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CourseUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."CourseUsers_id_seq";
       public          postgres    false    209            1           0    0    CourseUsers_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."CourseUsers_id_seq" OWNED BY public."CourseUsers".id;
          public          postgres    false    208            �            1259    16839    Courses    TABLE       CREATE TABLE public."Courses" (
    id integer NOT NULL,
    namecourse text,
    imagepath text,
    thumbnailpath text,
    sumary text,
    description text,
    price integer,
    slhvdg integer,
    sale integer,
    countregister integer,
    view integer,
    rating double precision,
    reviewcount integer,
    topicid integer,
    teacherid integer,
    outlineid integer,
    finish integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    lock integer
);
    DROP TABLE public."Courses";
       public         heap    postgres    false            �            1259    16837    Courses_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Courses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Courses_id_seq";
       public          postgres    false    201            2           0    0    Courses_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Courses_id_seq" OWNED BY public."Courses".id;
          public          postgres    false    200            �            1259    16882    Likes    TABLE     �   CREATE TABLE public."Likes" (
    id integer NOT NULL,
    courseid integer,
    userid integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Likes";
       public         heap    postgres    false            �            1259    16880    Likes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Likes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Likes_id_seq";
       public          postgres    false    211            3           0    0    Likes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Likes_id_seq" OWNED BY public."Likes".id;
          public          postgres    false    210            �            1259    16890    Outlines    TABLE     �   CREATE TABLE public."Outlines" (
    id integer NOT NULL,
    nameoutline character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Outlines";
       public         heap    postgres    false            �            1259    16888    Outlines_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Outlines_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Outlines_id_seq";
       public          postgres    false    213            4           0    0    Outlines_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Outlines_id_seq" OWNED BY public."Outlines".id;
          public          postgres    false    212            �            1259    16898    Reviews    TABLE     �   CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    message text,
    userid integer,
    courseid integer,
    rating integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Reviews";
       public         heap    postgres    false            �            1259    16896    Reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Reviews_id_seq";
       public          postgres    false    215            5           0    0    Reviews_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;
          public          postgres    false    214            �            1259    16909 	   Searchers    TABLE       CREATE TABLE public."Searchers" (
    id integer NOT NULL,
    idtopic integer,
    nametopic text,
    idcourse integer,
    namecourse text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    document_vectors tsvector
);
    DROP TABLE public."Searchers";
       public         heap    postgres    false            �            1259    16907    Searchers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Searchers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Searchers_id_seq";
       public          postgres    false    217            6           0    0    Searchers_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Searchers_id_seq" OWNED BY public."Searchers".id;
          public          postgres    false    216            �            1259    16850    Topics    TABLE     �   CREATE TABLE public."Topics" (
    id integer NOT NULL,
    nametopic character varying(255),
    categoryid integer,
    counting integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Topics";
       public         heap    postgres    false            �            1259    16848    Topics_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Topics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Topics_id_seq";
       public          postgres    false    203            7           0    0    Topics_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Topics_id_seq" OWNED BY public."Topics".id;
          public          postgres    false    202            �            1259    16920    Users    TABLE     i  CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    fullname character varying(255),
    role integer,
    "check" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    lock boolean
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16918    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    219            8           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    218            �            1259    16931 
   Viewvideos    TABLE     U  CREATE TABLE public."Viewvideos" (
    id integer NOT NULL,
    namevideo text,
    namecourse character varying(255),
    videopath character varying(255),
    chapter character varying(255),
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    idcourse integer
);
     DROP TABLE public."Viewvideos";
       public         heap    postgres    false            �            1259    16929    Viewvideos_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Viewvideos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Viewvideos_id_seq";
       public          postgres    false    221            9           0    0    Viewvideos_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Viewvideos_id_seq" OWNED BY public."Viewvideos".id;
          public          postgres    false    220            k           2604    16861    Carts id    DEFAULT     h   ALTER TABLE ONLY public."Carts" ALTER COLUMN id SET DEFAULT nextval('public."Carts_id_seq"'::regclass);
 9   ALTER TABLE public."Carts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            t           2604    16945    Categories id    DEFAULT     r   ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);
 >   ALTER TABLE public."Categories" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            l           2604    16869    CourseCarts id    DEFAULT     t   ALTER TABLE ONLY public."CourseCarts" ALTER COLUMN id SET DEFAULT nextval('public."CourseCarts_id_seq"'::regclass);
 ?   ALTER TABLE public."CourseCarts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            m           2604    16877    CourseUsers id    DEFAULT     t   ALTER TABLE ONLY public."CourseUsers" ALTER COLUMN id SET DEFAULT nextval('public."CourseUsers_id_seq"'::regclass);
 ?   ALTER TABLE public."CourseUsers" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            i           2604    16842 
   Courses id    DEFAULT     l   ALTER TABLE ONLY public."Courses" ALTER COLUMN id SET DEFAULT nextval('public."Courses_id_seq"'::regclass);
 ;   ALTER TABLE public."Courses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            n           2604    16885    Likes id    DEFAULT     h   ALTER TABLE ONLY public."Likes" ALTER COLUMN id SET DEFAULT nextval('public."Likes_id_seq"'::regclass);
 9   ALTER TABLE public."Likes" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            o           2604    16893    Outlines id    DEFAULT     n   ALTER TABLE ONLY public."Outlines" ALTER COLUMN id SET DEFAULT nextval('public."Outlines_id_seq"'::regclass);
 <   ALTER TABLE public."Outlines" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            p           2604    16901 
   Reviews id    DEFAULT     l   ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);
 ;   ALTER TABLE public."Reviews" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            q           2604    16912    Searchers id    DEFAULT     p   ALTER TABLE ONLY public."Searchers" ALTER COLUMN id SET DEFAULT nextval('public."Searchers_id_seq"'::regclass);
 =   ALTER TABLE public."Searchers" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            j           2604    16853 	   Topics id    DEFAULT     j   ALTER TABLE ONLY public."Topics" ALTER COLUMN id SET DEFAULT nextval('public."Topics_id_seq"'::regclass);
 :   ALTER TABLE public."Topics" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            r           2604    16923    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            s           2604    16934    Viewvideos id    DEFAULT     r   ALTER TABLE ONLY public."Viewvideos" ALTER COLUMN id SET DEFAULT nextval('public."Viewvideos_id_seq"'::regclass);
 >   ALTER TABLE public."Viewvideos" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221                      0    16858    Carts 
   TABLE DATA           Q   COPY public."Carts" (id, userid, subtotal, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    205   ce       '          0    16942 
   Categories 
   TABLE DATA           R   COPY public."Categories" (id, namecategory, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   �e                 0    16866    CourseCarts 
   TABLE DATA           W   COPY public."CourseCarts" (id, courseid, cartid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    207   �e                 0    16874    CourseUsers 
   TABLE DATA           W   COPY public."CourseUsers" (id, courseid, userid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    209    f                 0    16839    Courses 
   TABLE DATA           �   COPY public."Courses" (id, namecourse, imagepath, thumbnailpath, sumary, description, price, slhvdg, sale, countregister, view, rating, reviewcount, topicid, teacherid, outlineid, finish, "createdAt", "updatedAt", lock) FROM stdin;
    public          postgres    false    201   �f                 0    16882    Likes 
   TABLE DATA           Q   COPY public."Likes" (id, courseid, userid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   Us                 0    16890    Outlines 
   TABLE DATA           O   COPY public."Outlines" (id, nameoutline, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213   0t                 0    16898    Reviews 
   TABLE DATA           d   COPY public."Reviews" (id, message, userid, courseid, rating, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   Mt       !          0    16909 	   Searchers 
   TABLE DATA              COPY public."Searchers" (id, idtopic, nametopic, idcourse, namecourse, "createdAt", "updatedAt", document_vectors) FROM stdin;
    public          postgres    false    217   �t                 0    16850    Topics 
   TABLE DATA           a   COPY public."Topics" (id, nametopic, categoryid, counting, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    203   v}       #          0    16920    Users 
   TABLE DATA           y   COPY public."Users" (id, username, email, password, fullname, role, "check", "createdAt", "updatedAt", lock) FROM stdin;
    public          postgres    false    219   �}       %          0    16931 
   Viewvideos 
   TABLE DATA           �   COPY public."Viewvideos" (id, namevideo, namecourse, videopath, chapter, description, "createdAt", "updatedAt", idcourse) FROM stdin;
    public          postgres    false    221   ��       :           0    0    Carts_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Carts_id_seq"', 1, false);
          public          postgres    false    204            ;           0    0    Categories_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Categories_id_seq"', 3, true);
          public          postgres    false    222            <           0    0    CourseCarts_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."CourseCarts_id_seq"', 1, false);
          public          postgres    false    206            =           0    0    CourseUsers_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."CourseUsers_id_seq"', 6, true);
          public          postgres    false    208            >           0    0    Courses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Courses_id_seq"', 57, true);
          public          postgres    false    200            ?           0    0    Likes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Likes_id_seq"', 16, true);
          public          postgres    false    210            @           0    0    Outlines_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Outlines_id_seq"', 1, false);
          public          postgres    false    212            A           0    0    Reviews_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Reviews_id_seq"', 4, true);
          public          postgres    false    214            B           0    0    Searchers_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Searchers_id_seq"', 123, true);
          public          postgres    false    216            C           0    0    Topics_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Topics_id_seq"', 6, true);
          public          postgres    false    202            D           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 15, true);
          public          postgres    false    218            E           0    0    Viewvideos_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Viewvideos_id_seq"', 215, true);
          public          postgres    false    220            z           2606    16863    Carts Carts_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "Carts_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Carts" DROP CONSTRAINT "Carts_pkey";
       public            postgres    false    205            �           2606    16947    Categories Categories_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Categories" DROP CONSTRAINT "Categories_pkey";
       public            postgres    false    223            |           2606    16871    CourseCarts CourseCarts_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."CourseCarts"
    ADD CONSTRAINT "CourseCarts_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."CourseCarts" DROP CONSTRAINT "CourseCarts_pkey";
       public            postgres    false    207            ~           2606    16879    CourseUsers CourseUsers_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."CourseUsers"
    ADD CONSTRAINT "CourseUsers_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."CourseUsers" DROP CONSTRAINT "CourseUsers_pkey";
       public            postgres    false    209            v           2606    16847    Courses Courses_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT "Courses_pkey";
       public            postgres    false    201            �           2606    16887    Likes Likes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_pkey";
       public            postgres    false    211            �           2606    16895    Outlines Outlines_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Outlines"
    ADD CONSTRAINT "Outlines_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Outlines" DROP CONSTRAINT "Outlines_pkey";
       public            postgres    false    213            �           2606    16906    Reviews Reviews_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "Reviews_pkey";
       public            postgres    false    215            �           2606    16917    Searchers Searchers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Searchers"
    ADD CONSTRAINT "Searchers_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Searchers" DROP CONSTRAINT "Searchers_pkey";
       public            postgres    false    217            x           2606    16855    Topics Topics_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Topics"
    ADD CONSTRAINT "Topics_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Topics" DROP CONSTRAINT "Topics_pkey";
       public            postgres    false    203            �           2606    16928    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    219            �           2606    16939    Viewvideos Viewvideos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Viewvideos"
    ADD CONSTRAINT "Viewvideos_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Viewvideos" DROP CONSTRAINT "Viewvideos_pkey";
       public            postgres    false    221            �           1259    16949    idx_seacher    INDEX     M   CREATE INDEX idx_seacher ON public."Searchers" USING gin (document_vectors);
    DROP INDEX public.idx_seacher;
       public            postgres    false    217                  x������ � �      '   S   x�3�OM�4202�50�54R04�20�2�г42�60�#�e�雟���������\��U��������������9H{� m��            x������ � �         y   x���1�0��NὊ�lbΒ������qTu���`�HE�	6�O��V�C�Gb%�Y���o�;����g"
4-Ҭ��'�$v�\�%"E��_񜸭��ǝZ����u�9"�MzI|Tf~�C         �  x���v۸ǯ駀�"��H4?����c{�]�q6����6��DHbB<����^��}�}�� %J�g��v�KH3?�m�x��<ea�Wi�󢤏�Dğ\'�r~R�<�Ӭ*��2�󓩨�ۖ�&��*��B]<q��o�w�E�g��g�r��B���Y�h��v�أ�Y΋�'�]>:}� ��m�ME�ٓ�]XL�8+�=��DM�q�R�x���g�49��r�&|�)�#�<,D�#��'"���",�u���,��,�5}�Tq1Ȕ����\�IC�YU��i��Y8ŵ��-�+<����O}Y����}�J>]�"���-g��~"�7u�wy�O�IB�IWaQ0�?�,Nxn��n�Ӥ���}'���.��݃��hE>-ct����W)j����8�oP�0�U)2���=P@Γ)���_��m-��eQ�a&��B�;ڐ����͕\��)KB|,kM�q�+6M�a�g��iU�byp�,c�.
�u�:e�y	��b�.���V�a=e'��H��&
�`)�g$���Wr)@�VV傔1ḑ�d��C�:��N�5	�x
^�G�	:��#�{XZ�a�J���4F��ޠ�0�E�kə� �'�:�%yC^��4l߰��m���O�����}��o�}�a��^����?����!�����7�ᐊ�#�5N�y��9R���R�����wUq�z{�$�?o�W�A�A���`+48�g���1$8ػp��6=������c��q&U�S��Y�_M�.��yo+�6j'��{4�����t \&_8�aA���n�}_�����=�w���a˨�6]Q�7��驩�E��� YN�ih��2CT��JzJ��f{[F{ؚ����Gq�J�8�,s�ŁV�u46�W�t�鴉v�l���J��0��^�:���U0���)0�LX�혞3���V�u���4�L�
&��y�h��F�����>�d�O��$��a�bJw�0e�&��P,�Xkm����p���I����u��I��C#��P�v�"�*������~ħ(<P�r��{xB��T�$�\gi�~평Z�A�9�Fk3U�u�� s>��'�T��+�	9W�Ow�1����sA���<���h�`�Vs5m�q�3V��1��z��4�$=6]�7x:�]"���U���`�0�H��z�H �D�2�x]X�2I�UV.z��9e��F���䩅H�(��{Z�j����q��J�
���UNP�G���@.C�~�=) 	^�_�3����50d��x�(���Jh�B��j3�|�~���y�cVbgp�&	����P���X�KXd"�Y=�x</��$L���4K��$BϨ���� �����@��B.��4�,�3�Mpm��Y(��7bR(޽��z��J��a�5��X)PnM��~�B��0�	KI=zd.�%P�1V=��K�9�=���;�q}�j����UfS�4�\sd�h\��yڐGZ���Ҁ�c�0�a�%���k�i�F�*�TBy[s#f[�3�u��nkN�.%��:TĄ��:���7����a�/�CM>Io*�[���D���L;��s!d����AK���:��N��r3���՚p{w��N��׮��5`��c��} [�e������4b�)ط��Y徛G��n��W��42Y��$c'��%9:Ɠnhm	H����Ǟ@�M������*r�QU�A�_�jfC�������LG`$t^M� H+���Gr�9�.��ʏ)rW��Ue��6Ep{M��-��0\�K&�eSJAu�J�m*��`�$�AMTeÿ�L=�_ʖ薔b�,Y��f�`Y`��z����㙒�<��ut|%g�Y��a��6�/���Y_�rս�r�_S�����K��4pK��D���$���P~�l5ʎb��JX_�z���ԫ�m{��ֳ'Y=�m֊��ѳ0��	�t�p6a V}T�!�o�z��`�X?II��9 ��܌>�qs���$b�D�v|�*����4�9ЭSr��0�]s`u,��� r��7ŗ3����>��6��@[�����a8�M���Q`�L�vv��*�c��(*90V���ݣ�J~�Q:������G!��=���z�����o#CmG������07�h�&Q���NX���N@�ԧ$����	��G��|�ylwܑ�nYG�q���ګdf�4z&�EJ�!-�>~� z+J#@#ஷ��5:sО�c:~�E����Z%�H�>O幔f�@��`�7�w���k��U<�5���>uQ��pӱ:v����#��N]� ����ţ���E?}��X��6�>��٠�pwQ�<�ڰ�>��qB��C��b���a`ہ㚃Q��=��ы�:�p�� ��q�N��<��=�����Aw�#�-�z�ƃ��g�ð�C���L������v�[i����Vs����ní��̓O1p��RJS8�9|rw��ƻ��������~��d	���y�}�c��hKa+`��
]Ha�`�v���V��9�Fo}PI��3�1m{2�544�8:�nƆq`y�?u��]6�l�I>�l=6�m7nސ��jBSBSBS�(��ݧ�ǁCo�t�*�E��ml�(������yO&#e&��$���O{��T�&%�sw�İ�����8]|h�����8��b�h$m�U�j���M��!�f�f���!�V�H�oڣ��K[E@¸;�Q&q�Kd#544>�����n�^Դ���Mg��ba��:r�u�н�h�ŭ�f�T�T�T��,�x{ײ3� ]�����Iǝ"P��l�mGҁ[[:pЈЈ���8B�;Ģa�H�N��Wt��:�������'lR(B��-�G���VpQ��	)懔�K�cy
k�^e�|�T�	��9_pe$�"��'E�b�zcW��Յ����ăw N�M��%�E �+Aa�kVx������+�³M����3�� �
�/whR�A�A��s�n�Н��CӦ=�æx�D���\ۓ�����?����{N�����e�1�(����`o�s��"�H���Lxmo�>�'��>�T��^U����
�
͊/������`���gz^+�E`�Hcٔ�*UhRhR��I����*����`�ŭ�"�b���ԠРР���¿YS��=r:8�.��^�GGG�����         �   x�u�Q� ��g9Eߗ�,��9��ҹJ���~��%���2e>�O��� ұ��s��x�uv�@S�K��c|%����:rE�5�K����͗%,�h��]��I�m��X$�xM�4�EQ�B}%���]�P_	8O��������p���[�i#�'kH��$�2'�����Cۭ�~--�K���m�?��$x# | 20�            x������ � �         }   x�}�1
�0��Y:���gI����J�.��V�Bq��?>�6ƃ�@FE
V��-�� Lsm�"�O��#t6j���5[��X?Fz�;�������[��sJl�/p�:�i	�����\_ߌ5�      !   �  x��Z�v�F]�_���1�t7@7v�"'�D���$�$3��D8$�@ۙ�|I>m�d���h<�Ď&���S�Vխ'ɸ�0�r�r�ȹN��,O��iR�Y~O�f��\>zD�|C^�Zo�<I�S�S��I�h�e̕G}��F��(r�nw]Un̈�C%n�w�պ1'����тq�b��|Sن���&+�ͱ.�,��
#���Ә��r���ƒ��i�-�J?ZC����X ւ���l�Tł�~�>!�E��0��P�o}��yr�v�ؤ���&c*=�f�"9�	���i�9>�,Sw�T~�"����I�ye�r]�������^0�(2X��  6��y��,�D`�rx�"�?<&7۔\��.�S��1ۤ�!j%W��~�c�H
$��H�ME.�4�i��kHe�jRPQ#��� �%u.���R���@�'ֿ� L���� �T��Cn�=�D5�*d�f_�)��}:R#@�����B�
�
��)%�#�ۛ�ￂ��IQ��d����"(Y-��]��x��9�o���a��c�D=��6�����X�5�p��{gt� �:����z��Y�/����]jBi`��y彮�9��1���juswܑ���*�"�_� A�^$�Ԗ���?68��*�eJ4d_C:	 8�J�V�>���#�g/VWN�bE#��mvW��e�'O��,���y�@1~YwiUA"%�����qƄ1U�|&�l�˘��(o�mc���	`�Sh,��"h8�;�`YC 0 ���cP~�����T{x�J�j��@A]����Ȁ57l-k��L� �b�BP��U��T�Aт�:`M���VԻ,'_�o�]q �_ǲJ���2��2#�U�hGL|�6dct����V���¦����VY�V���Z�I�ޚ��{~���e�-�*~�U�z�UF���[�B�1��}iG_�#��ǁ��P�x���j��� �A/5z�����?~�GÉ�G"��P+mC�^N�#�|���~�柈��l�&t�����w���=�D��R�0ʆʳ"����L.A����Z��ph�(����i>v^��֠b��Aco��7��#��c��L�2�ZuL�F��#�W���L���%b�<E'�4���jQ��=^7^�m����
0��>�kr�TuZ�wP��.�#�����Hg|@~���!��jl���0���ME5;�i	�i
�OiY`�z�����p��M==�#����T?�P�5��4M�~x�@іЮ�E��݀WxB�U`[���q[�k�݌F�]��<�N��4O��5~��>h7f��^_]<'�:��i,��^O�50OP֖^����fU�`�>M���M�$���`�C8�W�Z��$(�7��u��ɫ4Y�K��9�kl�^Wc��9b�[��$���B�}���n�	�;�D�["��k�6	������������X4׃mQ�5�!������!�J�$H��N��O�/��\�v���z<j���x�N��H�%q?��acKs�w]l0�(3�˾��������=G
�I��b���?��G ��l�ݦ��P��o;;]sv�Z�XȰp���˒�܇��y���ȥ�-R���?3D3�Zt1���B��eU)�c'm
��ܲ,�)Sp�=�q�7��颭��d@���ڈ��7��<��t��>i���,�
'_�]��g����&�d��k�����$�9O�E�a�ܙi/��}��Hk���B��ݛ��`t#��J[���si���2���*yW�`Y�k�Y'ڇ�����*k(�G$<BU��ި
^�G�`0�s+�C>k��sC�-���֘pnN �
}�Rgr�aT��T��š`��>�}��H��16s��>��/��Z�a�"M�~�����Cs�����x�cmF�v(�}ʺ�,�6�*)>��2T��zu��n�ܯ�\�C����L���	��4/&���!�se��#�Ux�a�=���n8K�߬�����&Z������G��WF�s�?�LWM�(���-���2M���� �l6����Y�ӯ��0�qO���@C0���?Gw.h�u���]C\��g����ĩ��Upη{��-YɳXzO}����X,����         a   x�3�t�4�46��4202�50�54R04�24�24�3�0�60�#�e�闟��U4��� �Js܆����9�R��3S8�8�5Ä��?��1z\\\ ��3�      #   �  x���I��X�Ǹ
9�x��ҍ��R�x�����(��}�6jX+��h櫴����������V[���n�W>X������/���&�Rɥ-q'���&,��a7n�w�z�j�j-���9H���@�����J�$�7(���S/)B�b$�Ww�H�������j�ۜ7'�F^/�����hv�֌�����mg#i�YB���G*�$HE`H���JLE Q��a���-�\�Ý�l��G�f�:il�k��(��̘6;�-���?M�:�m��֩�yU��et���Ɖ�����Q�������P���%@�!.!x���>b*�f3~�K��:v��OΠf$z�Vo$��O�-�Yd	ӤE��d�Q�(L,����?ߖͿ��9�TJ Q�SG��rG%A�V��}��jU��ʦ�5��y\��lR=����O�A}��0C�G����T.�vk\*E%
Pd|�CT�/�F.�-K�c���;��3��ڲ��dt��ݩ�7]���uww��e�N�A�;`-3�B}7�.L�XT̙� }Sr��w��a!�V�6����6%�t��);�y/��P;�=cb�h��	�3�j��o�$Mh�����?���E�r[(���U�H�L�_Iy#�#�a>B��Z����7��;�S�h��(�&��ɚ�P�)k�0e����څ��"P"~�Z;/Ɵ�bA* aȨ�z�;�x� 9 �N@�����Z;�=������h� >���c�D^R	C�+�cص�Fg���/\'�-zD(���/I,#Z>*��W/�5�3�Hw��}�m't�ǛS�O��_�����\|���򤲫���X�+���BYe�
 ����ȗ�,��D�˥�~������/@f��V�)��1Ru�����S}a�2Yb"S~�EA�n]˿	E�TF��TBT�r4�Zߟ�T*��S�      %   �
  x��\�o��?�ŗ=lĦ�>�4��dw�ک;��6E@�c�6E*|�QO]��SE{��E�"EQ�'稢������eK��a���;6�X�����f��P���C?2[/��֢^g��y�%��X=�B��}v����g��C��&]������O`6vw����7������$�ٻ_�`�O�?�9;�K	�gﾂ����I:^7!�⬯J����[��Iغ��׍r�υ�(����㈞�A�A�Ƃ��r�q�����_�?h���j���n�5��L���j��۶�J��n�7���ĕ�. n+�-��E�]Ew���!2q�qWJ��[��I)sS��Ql�7>4��u���5?��"K�΃��?�ת)�xb���{�aO�>��V1eY�퀘79��N���\�䔹��k���)t!tW<9�.\�l��䔺:�mm.u�CC�$J�xIn��9]N�5�·<ts�J]��9I�^c�#���rbwC7[���_��Ϩ�A�t�mxm�T]2n\"�B��֤֓0K����㽄'IA����Q����r��7�t�	��N��tZ�I���>��iH7�����?��������Oa�8��(M~��G�K��hzm�7�y��$�_d/�������^��L|�}cJք���k�j9����C������Q�+%�;m�y��&��Wp��K��#��;`�	��$�6�n[�ښ��i�4Bp�@���-���@�d�U�Ñ{��VY C�2�-4P,9#��Lr��r�+߿�z�#'�&u=ON��[����^,Ը��]6$�.LxY
�Z��6�?_��x�dg��H����M�C�������?3�� ������@��6�^?��Y�0�G���i�f8���m3���;W��P�si<��(�M��σ��=��P&
Q�(B�_��� 6w/�F�Xm⨦;�ό(v��~XFq8���}� �;rԄ��i�I��&����Q΃GC�s,s����gYX׼6��e��-�EL�Э*n�Da�7�qn�Sp��:�37;w1D�����K�������5��i��W`�,�`l*,!�M���j�vF͔g�,Wս�I͋!��4�v>vYN��փ�WLz��h?�Q�=�������A)�9�u*�WS�-c���­�&c+nZ!f��=���=�Q>����Z��߯!?{����b���W%��G�т:÷�Ҵk ����_��>*�x�c�V�d�5��۪M�Y-�R,��ٟ�m�S͈���S�_�|��鄽h����<;�k_�ז��oB#���.[�����y;	�Ձϙc�SC
��sO���%M����(�a=��~���L1�~��vw�L�iF���0�����,�|�!� f��'�mz�a�92�Bwk�DwKݓ6W\�P�z�tGJ�7��Dޠ_L��l	�SlQ��Y��E<QU�k�/��߫��Lb�-M�-�`	z2WN�
u���L�:2KҮ(Qn�,���Ea�nK
]�f�I�� Y�G�t��������J�]��b)�ëzkܯ�[�a��^.9��8s/��O�ML�#��b��T�ʺR����P&!��(��>Zp3�V�Ԟ��X?�G]5�VY����_��R��0�]��*3��~�*}I]��heo�5���JŤ�ØP��<
`v⼄����sn�C�eԑ2�+�>�+싶�Kne�{���j_�E~$���Nh5�����rTl�(Ih���媚{)I83��B�g!�[Q^p�%�?��?E�F<�Vty�m��א,�A6��ʝ�?sN�͍hm�U˚���!fnľ��&�tH�c,X�Yi�.j�eo~�V�.KhK+yx�lKV�w���Y5I��79��	s����g���r"o�zC�z�#D��Ϣ�/{�����y.I��ݬP-)va�8W�ݜ(�a^^Z�}���oj�K��J�;;�#k�K��w
H�]���k�/�v.���p�GO�K�����я��5��f�w\he�������O�?j#�A���o�a��+�$Y/��}^A�ivL���d~������ʤ�z�Μ��Ȼi�0��8w��6����
5��e���^�O"��6|:�3��(���?^���4[Z�grd!��^���I�v��/;��IQas�8~����|=�+p��'1;�Ui`�2-����JM�7eQfT]���^^����Ѣ����A3.�:H�8=��ǧ��4( ̢c�0�R�+�p�P��A?����+�J�k�?���jX��Ϋ�'hf��N{����C���GA����.ȗJ^��.���8����	k㑋�_#���B�&W�$��"{�h��s��	�Z������G!�h��oGa��ˏ�^���|��W%3�()hо�n��n�/Qh��8�n�4�~.$�� �{Q ̿T~���'�E�]�t��
x�Xus�`#MP�q�t�4�:	����R���9�8D�e���̂I������j��
8z��:�;Oٿ^���c�0nݺ5��Y6����]��N��OLe���];�w=�#~��b�R�f��N�� t�%<�Lяm�vDf9��j���:ZF~���G��g_noͩ��;��s*�SC���ޅ:��8��o���me�xb��-n��9�����.�DK���"��~�0��=��ݻ����K&W?�>�D�h�H�@�	Q�5��[��O7���͢ݙo���p�l��%�Ύ��h" ��5h|���:x�P��6<U3�*�"��BU��$*�     