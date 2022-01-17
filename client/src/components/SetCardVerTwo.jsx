import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import SubmenuIcon from '../icons/Submenu';
import ShareIcon from '../icons/Share';
import ChartIcon from '../icons/Chart';
import UserIcon from '../icons/User';
import EditIcon from '../icons/Edit';
import DecreaseIcon from '../icons/Decrease';
import TrashIcon from '../icons/Trash';

import UpdateIcon from '../icons/Update';
import KakaoIcon from '../icons/Kakao';
import { GrDocumentUpdate } from 'react-icons/gr';
import { RiKakaoTalkLine } from 'react-icons/ri';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { VscOutput } from 'react-icons/vsc';

import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';

const anim = keyframes`
  from{
  }
  to {
    transform: rotateY(180deg)
    }
`;
const CardContainer = styled.div`
  position: relative;
  perspective: 1000px;

  display: ${(props) => (props.$display ? 'none' : '')};
`;
const CardFront = styled.div`
  width: 100%;
  height: 13.75rem;
  background-color: white;
  border: 1px solid var(--warm-grey);
  border-radius: 10px;
  backface-visibility: hidden;
  transform: ${(props) => (props.isFlipped ? 'rotateY(-180deg)' : '')};
  transition: 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 2rem);
  margin: 1rem;
  /* height: calc(100% - 1rem); */
  /* margin: 0.5rem; */
`;
const SetInfo = styled.div``;
const SetName = styled.div`
  font-size: 1.25rem;
`;
const SetDesc = styled.div`
  margin-top: 1rem;
  font-family: 'GowunDodum-Regular', sans-serif;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  /* justify-content: space-between; */
  /* align-items: flex-end; */
  /* justify-self: flex-end; */
  * {
    font-family: 'GowunDodum-Regular', sans-serif;
  }
`;
const Icon = styled.div`
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;
const StatsContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Stat = styled.li`
  display: flex;
  margin-top: 0.5rem;
  > p {
    margin-left: 0.5rem;
  }
`;
const CardBack = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 13.75rem;
  border-radius: 10px;
  border: 1px solid var(--warm-grey);
  background-color: var(--warm-grey);
  backface-visibility: hidden;
  transform: ${(props) => (props.isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)')};
  transition: 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  > div {
    height: calc(100% - 1rem);
    margin: 0.5rem;
  }
`;
const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;
const Menu = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
  margin: auto;
  color: white;

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
  margin: auto;
  color: white;
`;

const SetCardVerTwo = ({
  isSearch,
  averageScore,
  id,
  createdAt,
  creator,
  description,
  solvedUserNumber,
  title,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isHidden, setIsHidden] = useState(false);
  const handleHidden = () => {
    setIsHidden(true);
  };

  const [isShare, setIsShare] = useState(false);
  const handleShare = () => {
    setIsShare(!isShare);
  };

  // TODO : 동작은 하는데 알림이 없음 ex)클립보드에 저장 완료 메시지
  const solveUrl = `http://localhost:9000/solve`;

  // * 카카오 공유하기
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${process.env.KAKAO_JS_KEY}`);
    }
  }, []);

  const shareKakao = () => {
    console.log('카카오 공유 버튼');
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Solutionist 문제 풀기',
        description: 'Username님이 공유하신 문제로 이동합니다.',
        imageUrl:
          'https://user-images.githubusercontent.com/73838733/149615624-3d540181-ce17-4bda-8bfe-2c382525e44a.png',
        link: {
          mobileWebUrl: 'https://solutionist.site/solve',
        },
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://solutionist.site/solve',
          },
        },
      ],
    });
  };

  // TODO : SetName, SetDesc, 90명, 90점 하드코딩 props로 수정

  // 검색 페이지 카드세트일 때 뒤집어지지 않고, solve로 navigate
  const navigate = useNavigate();
  const handleGoSolve = () => {
    // console.log('검색일 때 카드 클릭 콘솔로그');
    navigate(`/solve/${id}`);
  };

  const koCreatedAt = new Date(createdAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <CardContainer $display={isHidden}>
      {isSearch ? (
        <CardFront onClick={handleGoSolve}>
          <InfoContainer>
            <SetInfo>
              <SetName>{title}</SetName>
              <SetDesc>{creator}</SetDesc>
              <SetDesc>{timeForToday(createdAt)}</SetDesc>
              <SetDesc>{koCreatedAt}</SetDesc>
              <SetDesc>{description}</SetDesc>
            </SetInfo>
            <IconContainer>
              <StatsContainer>
                <Stat>
                  <Icon>
                    <UserIcon />
                  </Icon>
                  <p>{solvedUserNumber}</p>
                </Stat>
                <Stat>
                  <Icon>
                    <ChartIcon />
                  </Icon>
                  <p>{averageScore}</p>
                </Stat>
              </StatsContainer>
            </IconContainer>
          </InfoContainer>
        </CardFront>
      ) : (
        <>
          <CardFront isFlipped={isFlipped} onClick={() => setIsFlipped(true)}>
            <InfoContainer>
              <SetInfo>
                <SetName>세트 카드 버전2</SetName>
                <SetDesc>기능 테스트 용도입니다</SetDesc>
              </SetInfo>
              <IconContainer>
                <StatsContainer>
                  <Stat>
                    <Icon>
                      <UserIcon />
                    </Icon>
                    <p>90명</p>
                  </Stat>
                  <Stat>
                    <Icon>
                      <ChartIcon />
                    </Icon>
                    <p>90점</p>
                  </Stat>
                </StatsContainer>
              </IconContainer>
            </InfoContainer>
          </CardFront>
          <CardBack isFlipped={isFlipped}>
            <InfoContainer>
              <MenuContainer>
                <Menu>
                  <StyledLink to="/solve">
                    <EditIcon fill="white" /> 풀기
                    {/* // TODO : /solve 로 이동 */}
                  </StyledLink>
                </Menu>
                <Menu>
                  <StyledLink to="/edit">
                    <UpdateIcon fill="none" stroke="white" strokeWidth="2" /> 수정
                    {/* <GrDocumentUpdate /> */}
                    {/* // TODO : /edit 로 이동 */}
                  </StyledLink>
                </Menu>
                <Menu onClick={handleShare}>
                  {isShare ? (
                    <>
                      <CopyToClipboard text={solveUrl}>
                        <HiOutlineClipboardCopy />
                      </CopyToClipboard>
                      {/* <KakaoIcon  fill="white" strokeWidth="0" /> */}
                      {/* // ! 크기가 뭔가 안크다... */}
                      <RiKakaoTalkLine onClick={shareKakao} />
                    </>
                  ) : (
                    <>
                      <ShareIcon fill="white" /> 공유
                    </>
                  )}
                  {/* // TODO : 클립보드 & 카카오 공유 선택 */}
                </Menu>
                <Menu onClick={handleHidden}>
                  <TrashIcon fill="white" /> 삭제
                  {/* // TODO : display:none? 안보이게 처리 */}
                </Menu>
                <Menu>
                  <VscOutput /> 결과
                  {/* // TODO : display:none? 안보이게 처리 */}
                </Menu>
              </MenuContainer>
              <Icon onClick={() => setIsFlipped(false)}>
                <DecreaseIcon fill="white" />
              </Icon>
            </InfoContainer>
          </CardBack>
        </>
      )}
    </CardContainer>
  );
};

export default SetCardVerTwo;
